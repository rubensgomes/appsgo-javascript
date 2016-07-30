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
    function utilSvc($document, $log, $http, CONST) {
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
         * @throws TypeError if element value given is not right type
         */
        function getElementById(value) {
          $log.debug('checking if [' + value +
              '] is found in the current page DOM');

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
         * Spins the spinner in the location defined by the given DOM element
         * id.
         *
         * @param {string} -  The element id.  It should look like "#divId"
         */
        function startSpinner(value) {
            var elem = getElementById(value);
            if( !elem )
            {
              throw new Error('element with id [' + element_id +
                  '] not found in the current page DOM.');
            }

            if(!CONST.SPINNER)
            {
              throw new TypeError('CONST.SPINNER global variable not found.');
            }

            $log.debug("Starting spinner now...");
            CONST.SPINNER.spin(elem);
        }

        /**
         * Stops the spinner in the location defined by the given DOM element
         * id.
         *
         * @param {string} -  The element id.  It should look like "#divId"
         */
        function stopSpinner(value) {
            var elem = getElementById(value);
            if( !elem )
            {
              throw Error('element with id [' + element_id +
                  '] not found in the current page DOM.');
            }

            if(!CONST.SPINNER)
            {
              throw TypeError('CONST.SPINNER global variable not found.');
            }

            $log.debug("Stopping spinner now...")
            CONST.SPINNER.stop(elem);
        }


    }

    // annotates the injectable parameters
    utilSvc.$inject = ['$document', '$log', '$http', 'CONST'];

})();
