'use strict';

/**
 * @file File that contains main AngularJS module and
 *     its configuration block.
 *
 * @author Rubens Gomes [rubens.s.gomes@gmail.com]
 */

//When defining a module with no module dependencies,
//the array of dependencies should be defined empty.
//To retrieve a reference to the same module for further
//configuration, call angular.module without the array argument.
//Calling angular.module without the array of dependencies when
//the module has not yet been defined causes this Error:
//error:nomod Module Unavailable error to be thrown. To fix it,
//define your module with a name and an empty array, as in the
//first example above.
angular.module('rgApps.main', []);
angular.module('rgApps.currency', ['angularSpinner']);
angular.module('rgApps.units', []);
angular.module('rgApps.iot', ['highcharts-ng', 'angularSpinner']);
angular.module('rgApps.agile', ['angularSpinner']);
angular.module('rgApps.playground', []);

/**
 * AngularJS main application module
 */
angular.module('rgapps', [
  'ngRoute',
  'ngTouch',
  'ngSanitize',
  'rgApps.main',
  'rgApps.currency',
  'rgApps.iot',
  'rgApps.agile',
  'rgApps.units',
  'rgApps.playground'])


/**
 * AngularJS main module configuration block
 *
 * @param {$RouteProvider} $routeProvider the AngularJS ngRoute provider
 *     used to configure routes.  It requires the ngRoute module.
 */
.config(function($routeProvider, $locationProvider)
{
  $routeProvider
  .when('/',
  {
    templateUrl : 'views/home.tpl.html',
    controller : 'MainCtrl'
  })
  .when('/length',
  {
    templateUrl : 'views/length.tpl.html',
    controller : 'UnitsCtrl'
  })
  .when('/temperature',
  {
    templateUrl : 'views/temperature.tpl.html',
    controller : 'UnitsCtrl'
  })
  .when('/weight',
  {
    templateUrl : 'views/weight.tpl.html',
    controller : 'UnitsCtrl'
  })
  .when('/currency',
  {
    templateUrl : 'views/currency.tpl.html',
    controller : 'CurrencyCtrl'
  })
  .when('/iot',
  {
    templateUrl : 'views/iot.tpl.html',
    controller : 'IoTCtrl'
  })
  .when('/agile',
  {
    templateUrl : 'views/agile.tpl.html',
    controller : 'AgileCtrl'
  })
  .when('/playground',
  {
    templateUrl : 'views/playground.tpl.html',
    controller : 'PlaygroundCtrl'
  })
  .when('/about',
  {
    templateUrl : 'views/about.tpl.html'
  })
  .otherwise(
  {
    redirectTo : '/'
  });

  //use the HTML5 History API
  $locationProvider.html5Mode(true);

});
