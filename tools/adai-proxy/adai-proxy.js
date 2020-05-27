const config = require('./adai-proxy.config');
const util = require('util');
console.log(config);

// this all come from some other dependency
const express = require('express');
const httpProxy = require('http-proxy');
const request = util.promisify(require('request'));

// resolve the cmdline parameters
const ADAI_URL = config.baseUrl;
const PORT = config.port;

// show startup status
console.log('\nWebcoat ADAI reverse proxy');
console.log('-----------------------------------');
console.log('proxying ADAI url: ' + ADAI_URL);
console.log('proxy port: ' + PORT);
console.log('-----------------------------------');

run(ADAI_URL, PORT).catch((e) => {
  console.log(e.stack || e);

  process.exit(1);
});

async function run(adaiUrl, port) {
  const app = express();

  app.use(await getProxyMiddleware(adaiUrl));

  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });

  async function getProxyMiddleware(baseUrl) {
    const cookieJar = request.jar();
    const cookieUtils = cookieUtilsFactory();

    const proxy = getProxy({
      target: baseUrl,
      changeOrigin: true,
      followRedirects: true,
      selfHandleResponse: true,
    });

    await loginToLoginProxy();

    return (req, res, next) => {
      proxyRequest(req, res).catch(next); // see https://expressjs.com/en/guide/error-handling.html
    };

    async function proxyRequest(req, res) {
      let {proxyRes, body} = await proxy.proxyCall(req, res);

      if (isLoginProxyResponse(body.toString())) {
        await loginToLoginProxy();

        ({proxyRes, body} = await proxy.proxyCall(req, res));
      }

      // proxy status code and headers
      res.writeHead(proxyRes.statusCode, proxyRes.headers);

      // proxy body (as a buffer to support binary data)
      res.end(body);
    }

    function getProxy(httpProxyOptions) {
      const proxy = httpProxy.createProxyServer(httpProxyOptions);

      // we need to keep track of the promises (or rather their resolve() functions) if we want to
      // use async proxyCall() function - proxyRes is an event
      const pendingResolves = [];
      let i = 0;

      proxy.on('proxyRes', (proxyRes, req, res) => {
        let body = new Buffer('');
        proxyRes.on('data', (data) => {
          body = Buffer.concat([body, data]);
        });
        proxyRes.on('end', () => {
          pendingResolves[req.__webcoatId]({
            proxyRes,
            body,
          });
        });
        proxyRes.on('error', (error) => reject(error));
      });

      return {
        async proxyCall(req, res) {
          return new Promise((resolve) => {
            // store id so we can map the request
            req.__webcoatId = i++;

            pendingResolves[req.__webcoatId] = resolve;

            const cookies = cookieUtils.stringToObject(req.headers.cookie);

            // add stored cookies (overwrite any previous value)
            for (const cookie of cookieJar.getCookies(adaiUrl)) {
              cookies[cookie.key] = cookie.value;
            }

            // serialize the cookie object back into a Cookie header
            req.headers.cookie = cookieUtils.objectToString(cookies);

            // add X-XSRF-TOKEN header
            if (cookies['XSRF-TOKEN']) {
              req.headers['X-XSRF-TOKEN'] = cookies['XSRF-TOKEN'];
            }

            // force no compression (remove gzipping), so we can parse output
            delete req.headers['accept-encoding'];

            proxy.web(req, res);
          });
        },
      };
    }

    function isLoginProxyResponse(body) {
      // when not logged to login proxy, it sends back the login form, which is an <html> page with "loginproxy"
      // somewhere in text; good enough :)
      return body.includes('<html>') && body.match(/loginproxy/i);
    }

    async function loginToLoginProxy() {
      const baseUrl = adaiUrl;
      const firstLoginCookiePath = '/com.avaloq.afs.rest.services/rest/technical/firstLoginCookie';
      const log = {
        info: console.log,
        verbose: console.log,
        error: console.error,
      };

      log.info(`Authenticating login proxy on ${baseUrl}`);

      await request({
        method: 'POST',
        url: `${baseUrl}/auth/login`,
        form: {
          ...config.loginData,

          // utilize the fact /auth/login always does a redirect to get the XSRF-TOKEN from the firstLoginCookie path
          redirect: firstLoginCookiePath,
          assertionValidity: 24 * 3600, // 24h
        },
        followAllRedirects: true, // follow the POST redirect ('request' by default doesn't follow POST redirects)
        jar: cookieJar, // use cookie jar to store cookies
      });

      log.verbose('Cookies saved from login proxy: ' + cookieJar.getCookieString(baseUrl));
    }

    function cookieUtilsFactory() {
      return {
        stringToObject,
        objectToString,
      };

      function stringToObject(cookieString) {
        const cookies = {};

        if (cookieString) {
          cookieString.split(/; */).map((cookie) => {
            const [key, value] = cookie.split('=');

            cookies[key] = value;
          });
        }

        return cookies;
      }

      function objectToString(cookiesObj) {
        const cookies = [];

        for (const key of Object.keys(cookiesObj)) {
          const value = cookiesObj[key];

          cookies.push(`${key}=${value}`);
        }

        return cookies.join('; ');
      }
    }
  }
}
