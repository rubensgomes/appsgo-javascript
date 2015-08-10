# The appsgo mobile web application

appsgo is a mobile web application that provides a few common utilities, such
as unit conversion, and currency rates.  This application was developed as
a playground for Rubens to learn and experiment new things.

The mobile web app is currently deployed in the following site:

http://appsgo.mobi/

## Instalation

This file provides the configuration steps to configure the development
environment on Windows DOS.

**NOTE**:  As of 11/20/2014 I had issues configuring Node.js modules in cygwin.

* Download and install the Windows "SlikSVN" client .msi installation file from:

https://sliksvn.com/download/

* Download the Windows Node.js .msi installation file from:

http://nodejs.org/download/

* Install Node.js in the c:\nodejs\ folder.

* Open a Windows shell command prompt, and run the following command to insure
proper running of "node" and "npm".

    node -v
    npm -v

* Then ensure that npm is up-to-date by running the following command from the
Windows shell command prompt:

    npm install -g npm@2.1.9

* Open a Windows shell command prompt, and run the following commands to install
Node.js modules required during development

    npm install -g bower
    npm install -g grunt
    npm install -g grunt-cli

* Checkout the "appsgo" project from my GitHub:

https://github.com/rubensgomes/AppsGo.mobi

* Place the checked out foler in "C:\projects\"

* Open a Windows shell command prompt and go to the "C:\projects\AppsGo.mobi"

* Then run the following commands

    npm cache clean
    npm install
    bower install

## Build, Run and Deploy

Prior to running builds you must have your development environment properly
configured according to above instructions

In order to run a local build follow these steps:

* It is assumed the project is checked out to "C:\projects\appsgo"

* It is also assumed that you have previously run the "npm install" and
"bower install" commands as noted in the DEVINSTALL file.

* Open a Windows shell command prompt and go to the following path:
"C:\project\appsgo"

* Then run the following command to do build:

    grunt -d -v clean build

* In order to run a server locally, run the following command:

    grunt -d -v clean build serve

* In order to deploy the build to the production server, run the following command:

    grunt -d -v clean build deploy
