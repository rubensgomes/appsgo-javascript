(function() {
    /**
     * @file This file is a placeholder to define utility services used by the 
     * application.
     *
     * @author Rubens Gomes [rubens.s.gomes@gmail.com]
     * @version $Id: utility-svc.js 428 2015-09-21 18:47:38Z rubens_gomes $
     */
    'use strict';

    angular
        .module('app-core')
        .factory('utilityService', utilityService);

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

    utilityService.$inject = ['$log', '$http', 'CONST'];

})();
