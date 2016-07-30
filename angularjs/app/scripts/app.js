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

  var SPINNER_OPTS = {
      lines: 13 // The number of lines to draw
    , length: 28 // The length of each line
    , width: 14 // The line thickness
    , radius: 42 // The radius of the inner circle
    , scale: 1 // Scales overall size of the spinner
    , corners: 1 // Corner roundness (0..1)
    , color: '#000' // #rgb or #rrggbb or array of colors
    , opacity: 0.25 // Opacity of the lines
    , rotate: 0 // The rotation offset
    , direction: 1 // 1: clockwise, -1: counterclockwise
    , speed: 1 // Rounds per second
    , trail: 60 // Afterglow percentage
    , fps: 20 // Frames per second when using setTimeout() as a fallback for CSS
    , zIndex: 2e9 // The z-index (defaults to 2000000000)
    , className: 'spinner' // The CSS class to assign to the spinner
    , top: '50%' // Top position relative to parent
    , left: '50%' // Left position relative to parent
    , shadow: false // Whether to render a shadow
    , hwaccel: false // Whether to use hardware acceleration
    , position: 'relative' // Element positioning
    };
  var spinner = new Spinner(SPINNER_OPTS);

  // create and load the 'app' module
  var app = angular.module('app', [ 'ngRoute', 'ngSanitize', 'appRoutes' ]);

  // Define application constants
  /* jshint ignore:start */
  app.constant('CONST', {
    SPINNER_TIMEOUT : 10, // timeout in msecs to wait to start/stop spinner
    SPINNER : spinner,
    MIN_ELEMENT_TEXT_LEN : 1,
    MIN_SEARCH_TEXT_LEN : 3,
    CURRENCY_SPINNER_ID : 'currency_spinner',
    LENGTH_UNIT_REST_URL : 'http://www.rubens-gomes.com/appsgo/restportal/length/',
    MASS_UNIT_REST_URL : 'http://www.rubens-gomes.com/appsgo/restportal/weight/',
    TEMPERATURE_UNIT_REST_URL : 'http://www.rubens-gomes.com/appsgo/restportal/temperature/',
    TEMPERATURE_REST_URL : 'http://www.rubens-gomes.com/appsgo/restportal/analytics/temperature/sensors/000006c01f0b',
    CURRENCY_REST_URL : 'https://openexchangerates.org/latest.json?app_id=30255f99fd69456d8dd50fe9af849aab'
  });
  /* jshint ignore:end */

  // Configure HTTP Provider Interceptor to add context-path
  app.config([ '$httpProvider', '$windowProvider',
    function($httpProvider, $windowProvider) {
      $httpProvider.interceptors.push(function() {
        return {
          request : function(config) {
            if (!config)
            {
              throw 'AngularJS config object not found!';
            }

            if (!config.url)
            {
              return config;
            }

            // For REST Calls do not change the URL.
            if (config.url.startsWith('http://') ||
                config.url.startsWith('https://'))
            {
              return config;
            }

            var $window = $windowProvider.$get();
            if(!$window)
            {
              throw ('AngularJS $window object not found!');
            }

            // CONTEXT_PATH must be defined inside the index.html file.
            if(!$window.CONTEXT_PATH)
            {
              throw ('Global CONTEXT_PATH variable not found!');
            }

            if (!config.url.startsWith($window.CONTEXT_PATH))
            {
              config.url = $window.CONTEXT_PATH + config.url;
            }

            return config;
          }
        };
      });
    } ]);


})();