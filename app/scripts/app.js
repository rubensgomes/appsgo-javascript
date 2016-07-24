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

    // load the 'app' module with dependencies. app module was created inside
    // the index.html file.
    var app = angular.module('app', [ 'ngRoute', 'ngTouch', 'ngSanitize',
                                      'appCore','appConstants', 'appRoutes']);

    app.config(['$httpProvider',
                '$windowProvider',
                function($httpProvider, $windowProvider) {
      $httpProvider.interceptors.push(function() {
        return {
          request: function(config) {
            var $window = $windowProvider.$get();
            // For REST Calls do not change the URL.
            if ( config.url.startsWith('http://') ||
                 config.url.startsWith('https://') ) {
              return config;
            }

            if (! config.url.startsWith($window.CONTEXT_PATH)) {
              config.url = $window.CONTEXT_PATH + config.url;
            }

            return config;
          }
        };
      });
    }]);


})();
