"use strict";

const jsonServer = require('json-server');
const mockServer = jsonServer.create();

const path = require('path');
const util = require("util");

const defaults = jsonServer.defaults();
const config = require('./mock-server.config.json');

// reference data
const router = jsonServer.router(path.join(__dirname, './static-db/reference-data-db.json'));

// payment responses
const paymentsFilterDateRangeResponse = require("./static-db/6-payments-filterDateRange-response_en_GB.json");
const paymentsLimitResponse = require("./static-db/7-payments-limit-response_en_GB.json");
const paymentsFormResponse = require("./static-db/8-payments-form-response.json");
const paymentsDetailsResponse = require("./static-db/payment-details-response.json");
const paymentsDetailsFormResponse = require("./static-db/payment-details-form-response.json");
const paymentsDetailsLogsResponse = require("./static-db/payment-details-logs-response.json");

console.log('Webcoat mock server');

mockServer.use(defaults);

mockServer.use(jsonServer.rewriter({
  '/com.avaloq.afs.rest.services/rest/baseBankData/businessUnitBankDate': '/businessUnitBankDate',
  '/com.avaloq.afs.rest.services/rest/baseBankData/businessUnitBankDate\\?afp-lang=*': '/businessUnitBankDate',
  '/com.avaloq.afs.rest.services/rest/baseBankData/currencyList' : '/currencyList',
  '/com.avaloq.afs.rest.services/rest/baseBankData/currencyList\\?afp-lang=*' : '/currencyList',
  '/com.avaloq.afs.rest.services/rest/userSettings/settings\\?includeMetadata=*' : '/userSettings',
  '/com.avaloq.afs.rest.services/rest/baseBankData/businessUnitDefaultCurrency' : '/businessUnitDefaultCurrency',
  '/com.avaloq.afs.rest.services/rest/baseBankData/businessUnitDefaultCurrency\\?afp-lang=*' : '/businessUnitDefaultCurrency',
  '/com.avaloq.afs.rest.services/rest/payments/countries\\?afp-lang=*': '/countries'
}));

// NOTE: order below is important

// Below we route requests to specific payment response json files, based on url and/or queryString passed
mockServer.get('/com.avaloq.afs.rest.services/rest/payments/form*', (req, res) => {
  if (req.query) {
    console.log(`payments form req.query: ${util.inspect(req.query)}`);
    res.json(paymentsFormResponse);
  }
});

mockServer.get('/com.avaloq.afs.rest.services/rest/payments/swissqrbill*', (req, res) => {
  if (req.query) {
    console.log(`payments swissqrbill req.query: ${util.inspect(req.query)}`);
    res.json(paymentsDetailsResponse);
  }
});

mockServer.get('/com.avaloq.afs.rest.services/rest/payments/swissdomestic/form*', (req, res) => {
  if (req.query) {
    console.log(`payments swissdomestic req.query: ${util.inspect(req.query)}`);
    res.json(paymentsDetailsFormResponse);
  }
});

mockServer.get('/com.avaloq.afs.rest.services/rest/payments/swissdomestic/*', (req, res) => {
  if (req.query) {
    console.log(`payments swissdomestic req.query: ${util.inspect(req.query)}`);
    res.json(paymentsDetailsResponse);
  }
});

mockServer.get('/com.avaloq.afs.rest.services/rest/payments/international/*', (req, res) => {
  if (req.query) {
    console.log(`payments swissdomestic req.query: ${util.inspect(req.query)}`);
    res.json(paymentsDetailsResponse);
  }
});

mockServer.get('/com.avaloq.afs.rest.services/rest/payments/internal/*', (req, res) => {
  if (req.query) {
    console.log(`payments swissdomestic req.query: ${util.inspect(req.query)}`);
    res.json(paymentsDetailsResponse);
  }
});

mockServer.get('/com.avaloq.afs.rest.services/rest/payments/paymentlogs/*', (req, res) => {
  if (req.query) {
    console.log(`payments logs req.query: ${util.inspect(req.query)}`);
    res.json(paymentsDetailsLogsResponse);
  }
});

mockServer.post('/com.avaloq.afs.rest.services/rest/payments/delete*', (req, res) => {
  if (req.query) {
    console.log(`payments delete req.query: ${util.inspect(req.query)}`);
    res.status(200).jsonp({
      message: "Delete ok"
    })
  }
});

mockServer.post('/com.avaloq.afs.rest.services/rest/payments/export*', (req, res) => {
  if (req.query) {
    console.log(`payments download req.query: ${util.inspect(req.query)}`);
    res.download('./tools/mock-server/static-db/payment-overview.pdf', 'payment-overview.pdf');
  }
});

mockServer.post('/com.avaloq.afs.rest.services/rest/export*', (req, res) => {
  if (req.query) {
    console.log(`payments download req.query: ${util.inspect(req.query)}`);
    res.download('./tools/mock-server/static-db/payment-overview.pdf', 'payment-overview.pdf');
  }
});

mockServer.get('/com.avaloq.afs.rest.services/rest/payments*', (req, res) => {
  if (req.query) {
    console.log(`payments req.query: ${util.inspect(req.query)}`);
    if (req.query.hasOwnProperty('filterDateRange')) {
      res.json(paymentsFilterDateRangeResponse);
    } else if (req.query.hasOwnProperty('limit')) {
      res.json(paymentsLimitResponse);
    }
  }
});

mockServer.use(router);

mockServer.listen(config.port, () => {
  // show startup status
  console.log('-----------------------------------');
  console.log(`Listening on port ${config.port}`);
  console.log('-----------------------------------');
});
