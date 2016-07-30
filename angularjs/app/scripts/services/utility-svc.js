(function() {
    /**
     * @file This file is a placeholder to define utility services used by the
     * application.
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

    // retrieves app module created in app.js
    var app = angular.module('app');

    // registers a factory utiltyService with app
    app.factory('utilSvc', utilSvc);

    /**
     * The utiltyService factory.
     */
    function utilSvc($document, $log, $http, usSpinnerService, CONST) {
        var service = {
                isNumber : isNumber,
                isSearchText : isSearchText,
                getElementById : getElementById,
                startSpinner : startSpinner,
                stopSpinner : stopSpinner
        };

        return service;

        /**
         * Validates the given input value to ensure it is a number.
         *
         * @param value {*} - The value reference to check for a number.
         * @throws {TypeError} Argument value must be a number.
         */
        function isNumber (value) {
            $log.debug('checking if [' + value + '] is a number');
            var msg = '';

            if (angular.isUndefined(value) || value === null) {
                msg = 'argument given is not a number';
                $log.error(msg);
                throw new TypeError(msg);
            } else if (!angular.isNumber(value)) {
                msg = '[' + value + '] is not a number.';
                $log.error(msg);
                throw new TypeError(msg);
            }

            $log.debug('[' + value + '] is a valid a number');
        }

        /**
         * Validates the input value to ensure it contains enough text characters
         * to be considered a valid searchable text.
         *
         * @param {string} -  The text value to validate.
         * @throws {TypeError} Argument value must be a valid searcheable text
         */
        function isSearchText(value) {
            $log.debug('checking if [' + value + '] is a valid searcheable text');
            var msg = '';

            if (angular.isUndefined(value) || value === null) {
                msg = 'argument given is not a text';
                $log.error(msg);
                throw new TypeError(msg);
            } else {
                var searchText = $.trim(value);
                if(searchText.length < CONST.MIN_SEARCH_TEXT_LEN) {
                    msg = 'argument given needs to have at least [' +
                        CONST.MIN_SEARCH_TEXT_LEN + '] characters';
                    $log.error(msg);
                    throw new TypeError(msg);
                }
            }

            $log.debug('[' + value + '] is a valid search text');
        }

        /**
         * Returns the page DOM element for the given ID.
         *
         * @param {string} -- the div dom id
         * @throws {TypeError} -- if element value given is not right type
         */
        function getElementById(value) {
          $log.debug('checking if [' + value +
              '] is found in the current page DOM');

          var msg;
          if (angular.isUndefined(value) || value === null)
          {
            msg = 'argument given is not a text';
            $log.error(msg);
            throw new TypeError(msg);
          }

          var element_id = $.trim(value);
          if(element_id.length < CONST.MIN_ELEMENT_TEXT_LEN)
          {
            msg = 'argument given needs to have at least [' +
              CONST.MIN_ELEMENT_TEXT_LEN + '] characters';
            $log.error(msg);
            throw new TypeError(msg);
          }

          var dom_elem = $document.find(element_id);
          if( !dom_elem )
          {
            $log.error('element with id [' + element_id +
              '] not found in the current page DOM.');
          }

          var elem = angular.element(dom_elem);
          if( !elem )
          {
            $log.error('angular element with id [' + element_id +
              '] not found in the current page DOM.');
          }

          return elem;
        }

        /**
         * Spins the spinner using angular-spinner
         *
         * @param {string} -- the spinner html key
         */
        function startSpinner(key) {
          $log.debug('checking if spinner [' + key +
            '] was provided.');

          var msg;
          if (angular.isUndefined(key) || key === null)
          {
            msg = 'argument given is not a text';
            $log.error(msg);
            throw new TypeError(msg);
          }

          usSpinnerService.spin(key);
        }

        /**
         * Stops the spinner using angular-spinner.
         *
         * @param {string} -- the spinner html key
         */
        function stopSpinner(key) {
          $log.debug('checking if spinner [' + key +
          '] was provided.');

          var msg;
          if (angular.isUndefined(key) || key === null)
          {
            msg = 'argument given is not a text';
            $log.error(msg);
            throw new TypeError(msg);
          }

          usSpinnerService.stop(key);
        }

    }

    // annotates the injectable parameters
    utilSvc.$inject = ['$document', '$log', '$http', 'usSpinnerService', 'CONST'];

})();
