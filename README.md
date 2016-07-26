# appsgo

appsgo is a mobile web application that provides unit convertion
(length, temperature, mass), currency rates, and other utilities
(like sensor temperature at Rubens' living room).  This mobile web
application was developed as a playground for [Rubens](http://www.rubens-gomes.com)
to learn more about the "AngularJS" and the completely new "Angular 2"
JavaScript frameworks.

The AngularJS version of this mobile web app is currently deployed in the
following site:

http://www.rubens-gomes.com/appsgo/

And the "Angular 2" version is currently under development.

## Installation

* Download and install Node.js (LTS version) from:

http://nodejs.org/download/

* Open a shell command prompt, and run the following commands to insure
proper running of "node" and "npm".

    node -v
    npm -v

* Open a shell command prompt, and run the following commands to install
the following Node.js modules globally.

    npm install -g grunt
    npm install -g grunt-cli

## Code Set Up

* Checkout the project from my GitHub below.  Notice that under appsgo there is
an "AngularJS" and "Angular 2" version of the same application.  Currently, the
"Angular 2" version is under development.

https://github.com/rubensgomes/appsgo

* Change to appropriate folder (angularjs or angular2), and create a
"secret.json" file with the following information:
```
{
    "host" : "<deployment server>",
    "port" : <deployment server port number>,
    "username" : "<deployment server username to authenticate>",
    "password" : "<deployment server password to authenticate>"
}
```

* Open a shell command prompt, and go to the appsgo installed directory.
Then run the following commands

    npm install load-grunt-tasks

    npm cache clean

    npm install


## Build, Run and Deploy

In order to run a local build follow these steps:

* Open a shell command prompt and go to the installed appsgo path.
Then run the following command to do build:

    grunt -d -v clean build

* In order to run a server locally, run the following command:

    grunt -d -v clean build serve

* In order to deploy to production, run the following command:

    grunt -d -v clean build deploy

# Description of Files in the Root Folder

## Gruntfile.js

The Gruntfile.js is a manifest file for the grunt build and deployment tool.

## package.json

The package.json file is a manifest file for the npm tool.  The "npm install"
command reads the package.json file and install all the dependencies in the
current folder.

# secret.json

The secret.json file contains information that is used by one of the
grunt tasks used to deploy the application.

