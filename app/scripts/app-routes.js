(function() {
    /**
     * @file File that defines the mapping between the HTML hyperlink (deep 
     * linking) URLs to its corresponding AngularJS controller and HTML view 
     * template.
     *
     * @author Rubens Gomes [rubens.s.gomes@gmail.com].
     * @version $Id: app-routes.js 424 2015-09-17 04:01:02Z rubens_gomes $
     */
    'use strict';

    angular
        .module('app.routes', ['ngRoute'])
        .config(routes);

    routes.$inject = ['$routeProvider', '$locationProvider'];

    function routes ($routeProvider, $locationProvider) {
        //use the HTML5 History API
        $locationProvider.html5Mode(true);

        $routeProvider
            .when('/', {
                templateUrl : 'views/home.tpl.html',
                controller: 'HomeController as home'
            })
            .when('/about', {
                templateUrl : 'views/about.tpl.html',
                controller : 'AboutController as about'
            })
            .when('/length', {
                templateUrl : 'views/length.tpl.html',
                controller : 'UnitsController as units'
            })
            .when('/temperature', {
                templateUrl : 'views/temperature.tpl.html',
                controller : 'UnitsController as units'
            })
            .when('/weight', {
                templateUrl : 'views/weight.tpl.html',
                controller : 'UnitsController as units'
            })
            .when('/currency', {
                templateUrl : 'views/currency.tpl.html',
                controller : 'CurrencyController as currency'
            })
            .when('/javascript', {
                templateUrl : 'views/javascript.tpl.html',
                controller : 'JavaScriptController as js'
            })
            .when('/iot', {
                templateUrl : 'views/iot.tpl.html',
                controller : 'IoTController as iot'
            })
            .otherwise( {
                redirectTo : '/'
            });
    }

})();