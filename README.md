# appsgo.mobi

The appsgo.mobi is a mobile web application that provides unit converstion
utilities (length, temperature, mass) and currency rates.  This mobile web
application was developed as a playground for 
[Rubens](http://www.rubens-gomes.com) to learn more about the AngularJS JavaScript framework.

The mobile web app is currently deployed in the following site:

http://appsgo.mobi/

## Installation

* Download and install Node.js from:

http://nodejs.org/download/

* Open a shell command prompt, and run the following command to insure
proper running of "node" and "npm".

    node -v
    npm -v

* Open a shell command prompt, and run the following commands to install
Node.js modules required during development

    npm install -g bower
    npm install -g grunt
    npm install -g grunt-cli

* Checkout the project from my GitHub:

https://github.com/rubensgomes/AppsGo.mobi

* Open a shell command prompt and go to the appsgo.mobi installed directory.
Then run the following commands

    npm install load-grunt-tasks
    npm install grunt

    npm cache clean
    npm install
    bower install


## Build, Run and Deploy

In order to run a local build follow these steps:

* Open a shell command prompt and go to the installed appsgo.mobi path. 
Then run the following command to do build:

    grunt -d -v clean build

* In order to run a server locally, run the following command:

    grunt -d -v clean build serve

* In order to deploy to production, run the following command:

    grunt -d -v clean build deploy
