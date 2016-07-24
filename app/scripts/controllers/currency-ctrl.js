(function() {
    /**
     * @file Registers the CurrencyController controller with the 'app'
     *       angular module.
     *
     * This controller has the business logic to retrieve different country
     * currency values in relation to the US Dollar.
     *
     * NOTE: Javascript variables have two scopes: function and global.
     *
     * Notice that we are declaring self invoking anonymous function
     * expressions; that is, '(function() {...}).();'. This programming practice
     * allows any variable declared within the scope of the annonymous function
     * to be encapsulated and only visible within the scope and execution of
     * that function. Therefore, it prevents the pollution of the global scope.
     *
     * @author Rubens Gomes
     */

    // place this function in 'strict' operating context to prevent 'unsafe'
    // actions from happening, and to throw more exceptions.
    'use strict';

    // retrieve the previously created 'app' (defined in app.js)
    var app = angular.module('app');

    // registers 'CurrencyController' with the app module
    app.controller('CurrencyController', CurrencyController);

    /**
     * The CurrencyController constructor.
     *
     * @param {$LogProvider}
     *            $log - the object used for logging.
     * @param {$RootScopeProvider}
     *            $rootScope - the global and unique scope object that used to
     *            configure the page title.
     * @param {Scope}
     *            $scope - the application model object where state is shared
     *            between this controller and the view.
     * @param {$HttpProvider}
     *            $http - the object used to make HTTP calls to REST services.
     * @param usSpinnerService -
     *            the object used to show a spinner on the GUI while certain
     *            lengthy calls are being executed.
     * @param CONST -
     *            the global angular constant object defined inside the
     *            'appConstants' module
     */
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
         * @param {String }
         *            value - The value of the international currency code to
         *            convert the U.S.Dollar to.
         */
        vm.toCurrency = function (value) {
            $scope.error = '';
            $scope.result = '';
            $scope.date = '';

            var url = CONST.CURRENCY_REST_URL + '&prettyprint';
            try {
                isCurrency(value);
                usSpinnerService.spin('spinner-1');
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
                        $scope.error = 'REST call [' + url + '] failed.';
                        if(data && data.error && data.error.message)
                        {
                        	$scope.error += ' : ' + data.error.message;
                        }
                        if(status)
                        {
                        	$scope.error += '. status : ' + status;
                        }
                        $log.error($scope.error);
                    });
            } catch (err) {
                $scope.error = 'REST call [' + url + '] failed.';
                if(err && err.message)
                {
                	$scope.error += ' : ' + err.message;
                }
                $log.error($scope.error);
            } finally {
                usSpinnerService.stop('spinner-1');
            }
        };

        /**
         * Validates the input value to insure it is a valid currency code.
         *
         * @param {String} value - The value the object to validate.
         * @throws {TypeError}
         *             The argument value must be a valid currency code.
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

        // call init() to initialize the default currency to be displayed on the view
        init();
    }

    // annotate the controller function with the parameters to be injected
    CurrencyController.$inject = ['$log', '$rootScope', '$scope', '$http',
                                  'usSpinnerService', 'CONST'];

})();