(function() {
    /**
     * @file Creates the "app" module.
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

    // create the 'app' module
    var app = angular.module('app', [ 'ngRoute', 'ngTouch', 'ngSanitize', 'appCore',
                                      'appConstants', 'appRoutes']);

    app.config(['$httpProvider', function($httpProvider) {
        $httpProvider.interceptors.push('middleware');
    }]);

    // add context-path "/appsgo/" to the URL
    app.factory('middleware', function() {
        return {
            request: function(config) {
              // For REST Calls do not change the URL.
              if ( config.url.startsWith('http://') ||
                   config.url.startsWith('https://') ) {
                return config;
              }

              if (! config.url.startsWith('/appsgo/')) {
                config.url = '/appsgo/' + config.url;
              }

                return config;
            }
        };
    });

})();
