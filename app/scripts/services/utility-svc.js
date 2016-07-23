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

    // retrieves appCore module created in app-core.js
    var appCore = angular.module('appCore');
    // registers a factory utiltyService with appCore
    appCore.factory('utilityService', utilityService);

    /**
     * The utiltyService factory.
     * 
     * @param {$LogProvider}
     *            $log - the object used for logging.
     * @param {$HttpProvider}
     *            $http - the object used to make HTTP calls to REST services.
     * @param CONST -
     *            the global angular constant object defined inside the
     *            "appConstants" module
     */
    function utilityService($log, $http, CONST) {
        var service = {
                isNumber : isNumber,
                isSearchText : isSearchText
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
  
    }

    // annotates the injectable parameters
    utilityService.$inject = ['$log', '$http', 'CONST'];

})();
