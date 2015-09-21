(function() {
    /**
     * @file Currency controller file
     *
     * @author Rubens Gomes [rubens.s.gomes@gmail.com]
     * @version $Id: currency-ctrl.js 430 2015-09-21 19:37:27Z rubens_gomes $
     */
    'use strict';

    angular
        .module('app-core')
        .controller('CurrencyController', CurrencyController);

    function CurrencyController ($log, $rootScope, $scope, $http, 
            usSpinnerService, CONST) {
        $rootScope.title = 'Currency';
        $scope.error = '';
        $scope.result = '';
        $scope.date = '';

        var vm = this;

        vm.currencies = [ {
            label : 'Australian Dollar',
            value : 'AUD'
        }, {
            label : 'Brazilian Real',
            value : 'BRL'
        }, {
            label : 'British Pound Sterling',
            value : 'GBP'
        }, {
            label : 'Canadian Dollar',
            value : 'CAD'
        }, {
            label : 'Chinese Yuan',
            value : 'CNY'
        }, {
            label : 'Euro',
            value : 'EUR'
        }, {
            label : 'Hong Kong Dollar',
            value : 'HKD'
        }, {
            label : 'Indian Rupee',
            value : 'INR'
        }, {
            label : 'Japanese Yen',
            value : 'JPY'
        }, {
            label : 'Malaysian Ringgit',
            value : 'MYR'
        }, {
            label : 'Mexican Peso',
            value : 'MXN'
        }, {
            label : 'Singapore Dollar',
            value : 'SGD'
        }, {
            label : 'Swiss Franc',
            value : 'CHF'
        }, {
            label : 'Taiwan New Dollar',
            value : 'TWD'
        } ];
        vm.currency = vm.currencies[1]; // default

        /**
         * Converts USD to the selected currency. The result is assigned to the 
         * $scope.result model object. If an error occurs, the $scope.error is 
         * assigned a message.
         *
         * @param value {string} - The value of the international currency code 
         * to convert the U.S.Dollar to.
         */
        vm.toCurrency = function (value) {
            $scope.error = '';
            $scope.result = '';
            $scope.date = '';

            try {
                isCurrency(value);
                usSpinnerService.spin('spinner-1');
                var url = CONST.CURRENCY_REST_URL + '&prettyprint';
                $log.debug('Calling REST URL [' + url + ']');
                $http
                    .get(url)
                    .success( function(data) {
                        if (! data) {
                            $log.error('REST call failed with empty data.');
                            $scope.error = 'null response calling [' + url + ']';
                        } else {
                          $log.debug('REST call succeeded.');
                          $scope.result = 'U.S. $1.00 = ' + 
                              data.rates['' + value] + ' ' + value;
                          $scope.date = new Date(data.timestamp * 1000);
                        }
                    })
                    .error( function(data, status) {
                        $log.error('REST call failed.');
                        $scope.error = 'HTTP Error [' + status + '] calling [' + url +
                            '] description [' + data.description + ']';
                    });
            } catch (err) {
                $log.error('REST call failed.');
                $scope.error = err.message;
            } finally {
                usSpinnerService.stop('spinner-1');
            } 
        };

        /**
         * Validates the input value to insure it is a valid currency code. 
         *
         * @param value {string} - The value the object to validate.
         * @throws {TypeError} The argument value must be a valid currency 
         * code.
         */
        function isCurrency (value) {
            $log.debug('checking if [' + value + '] is a currency code');
            var msg = '';

            if (angular.isUndefined(value) || value === null) {
                msg = 'argument given is not a currency code';
                $log.error(msg);
                throw new TypeError(msg);
            } else if (!angular.isString(value)) {
                msg = 'argument [' + value + '] given is not a currency code';
                $log.error(msg);
                throw new TypeError(msg);
            } else if (value.length !== 3) {
                msg = 'argument [' + value + '] given is not a currency code';
                $log.error(msg);
                throw new TypeError(msg);
            }

            $log.debug('[' + value + '] is a valid currency code');
        }

        function init() {
            var defaultValue = 'BRL';

            if( vm.currency.value ) {
                defaultValue = vm.currency.value;
            }

            vm.toCurrency(defaultValue);
        }

        // initialize the template when it is loaded
        init();
    }

    CurrencyController.$inject = ['$log', '$rootScope', '$scope', '$http', 
                                  'usSpinnerService', 'CONST'];

})();