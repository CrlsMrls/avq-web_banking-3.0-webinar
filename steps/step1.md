# 1. Project setup	

## Goal

* Understand the development process 
* Understand the application architecture

## Tasks

In this first step we will setup and run the project containing the base application we will build upon during the exercise.

### 1.1 Clone the project

Git clone the project for the provided repository link.

### 1.2 Install project dependencies
Make sure you have node (at least v12) installed. You can [download it from nodejs.org](https://nodejs.org/en/download/).

After cloning the repository, open a terminal in the project folder and execute:

```bash
npm install
```

At this stage the npm install command may not find all the packages. The `@avaloq` scoped npm packages are available only from the Avaloq repository.
You should have contacted Avaloq to get access. 

### 1.3 Run the project
Running the exercise requires three terminals: 
* in the first one we will run the mock server providing the data for this exercise; 
* in the second one we will serve the application itself;
* in the last one we will use the Angular CLI.

First terminal:
```bash
npm run mock-server-start
```

Second terminal (copy the dashes as shown):
```bash
npx ng serve --proxy-config=proxy.conf.json
```

The application will be accessible via browser. 

Check that it is working by navigating to the following URL: http://localhost:4200/

Note: for convenience we provide a script that runs both terminals simultaneously: `npm run serve:mock`. 
For this exercise, however, it is preferred to use the two terminals separately as we may need to restart the `ng serve` command several times.

The mock server allows us to run the whole exercise locally. The tradeoff is the listed payments are always the same, no matter what payment we click on or delete. You could run the exercise with a real ADAI instance with the following command: `npm run serve:adai`. 

### 1.4 Check the code

While npm is installing the dependencies, take your time to check the code. The lecturer will guide you through the three modules and the component.

## Definition of done
* The application is running correctly
* The source code is understood
* Web banking dependencies are clear

## Next step
* [Step 2. Integrate a Banklet](./step2.md)
