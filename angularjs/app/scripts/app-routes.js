(function() {
    /**
     * @file Creates the "appRoutes" module to defines the mapping between the
     *       HTML hyperlink (deep linking) URLs to its corresponding AngularJS
     *       controller and HTML view template. In this application we are
     *       associating URL links to corresponding controllers via the ngRoute
     *       module; instead of using the "ng-controller" directive.
     *
     * NOTE: Javascript variables have two scopes: function and global.
     *
     * Notice that we are declaring self invoking anonymous function
     * expressions; that is, "(function() {...}).();". This programming practice
     * allows any variable declared within the scope of the annonymous function
     * to be encapsulated and only visible within the scope and execution of
     * that function. Therefore, it prevents the pollution of the global scope.
     *
     * @author Rubens Gomes
     */

    // place this function in "strict" operating context to prevent "unsafe"
    // actions from happening, and to throw more exceptions.
    'use strict';

    // create the 'appRoutes' module and configure its routes
    var appRoutes = angular.module('appRoutes', [ 'ngRoute' ]);
    appRoutes.config(routes);

    routes.$inject = [ '$routeProvider', '$locationProvider' ];

    /**
     * Function used to define the routes and templates to be used when the user
     * clicks on certain URL links.
     */
    function routes($routeProvider, $locationProvider) {
        // use the HTML5 History API
        $locationProvider.html5Mode(true);

        $routeProvider.when('/', {
            templateUrl : 'views/home.tpl.html',
            controller : 'HomeController as home'
        }).when('/about', {
            templateUrl : 'views/about.tpl.html',
            controller : 'AboutController as about'
        }).when('/length', {
            templateUrl : 'views/length.tpl.html',
            controller : 'UnitsController as units'
        }).when('/temperature', {
            templateUrl : 'views/temperature.tpl.html',
            controller : 'UnitsController as units'
        }).when('/mass', {
            templateUrl : 'views/mass.tpl.html',
            controller : 'UnitsController as units'
        }).when('/currency', {
            templateUrl : 'views/currency.tpl.html',
            controller : 'CurrencyController as currency'
        }).when('/javascript', {
            templateUrl : 'views/javascript.tpl.html',
            controller : 'JavaScriptController as js'
        }).when('/iot', {
            templateUrl : 'views/iot.tpl.html',
            controller : 'IoTController as iot'
        }).otherwise({
            redirectTo : '/'
        });
    }

})();