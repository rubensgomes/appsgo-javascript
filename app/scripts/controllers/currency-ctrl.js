(function ()
{
    /**
     * @file Registers the CurrencyController controller with the 'app' angular
     *       module.
     * 
     * This controller has the business logic to retrieve different country
     * currency values in relation to the US Dollar.
     * 
     * NOTE: Javascript variables have two scopes: function and global.
     * 
     * Notice that we are declaring self invoking anonymous function
     * expressions; that is, '(function () {...}).();'. This programming
     * practice allows any variable declared within the scope of the annonymous
     * function to be encapsulated and only visible within the scope and
     * execution of that function. Therefore, it prevents the pollution of the
     * global scope.
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
     */
    function CurrencyController($window, $timeout, $log, $rootScope, $scope, $http, CONST, utilSvc)
    {

        $rootScope.title = 'Currency';
        $scope.error = '';
        $scope.result = '';
        $scope.date = '';

        var vm = this;

        vm.currencies =
        [
        {
            label : 'Australian Dollar',
            value : 'AUD'
        },
        {
            label : 'Brazilian Real',
            value : 'BRL'
        },
        {
            label : 'British Pound Sterling',
            value : 'GBP'
        },
        {
            label : 'Canadian Dollar',
            value : 'CAD'
        },
        {
            label : 'Chinese Yuan',
            value : 'CNY'
        },
        {
            label : 'Euro',
            value : 'EUR'
        },
        {
            label : 'Hong Kong Dollar',
            value : 'HKD'
        },
        {
            label : 'Indian Rupee',
            value : 'INR'
        },
        {
            label : 'Japanese Yen',
            value : 'JPY'
        },
        {
            label : 'Malaysian Ringgit',
            value : 'MYR'
        },
        {
            label : 'Mexican Peso',
            value : 'MXN'
        },
        {
            label : 'Singapore Dollar',
            value : 'SGD'
        },
        {
            label : 'Swiss Franc',
            value : 'CHF'
        },
        {
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
        vm.toCurrency = function (value)
        {
            $scope.error = '';
            $scope.result = '';
            $scope.date = '';

            var url = CONST.CURRENCY_REST_URL + '&prettyprint';
            try
            {
                isCurrency(value);
                $log.debug('Calling REST URL [' + url + ']');

                $http(
                {
                    method : 'GET',
                    url : url
                }).then(function successCallback(response)
                {
                    $log.debug('REST call succeeded.');
                    $scope.result = 'U.S. $1.00 = ' + response.data.rates['' + value] + ' ' + value;
                    $log.debug('result [' + $scope.result);
                    $scope.date = new Date(response.data.timestamp * 1000);
                    $log.debug('date [' + $scope.date);
                }, function errorCallback(response)
                {
                    $scope.error = 'REST call [' + url + '] failed.';
                    if ( response.data && response.data.error && response.data.error.message )
                    {
                        $scope.error += ' : ' + response.data.error.message;
                    }
                    $scope.error += '. status : ' + response.status + '. error : ' + response.statusText;
                    $log.error($scope.error);
                });
            }
            catch (err)
            {
                $scope.error = 'REST call [' + url + '] failed.';
                if ( err && err.message )
                {
                    $scope.error += ' : ' + err.message;
                }
                $log.error($scope.error);
            }
            finally
            {
                $log.debug('Inside finally block');
            }
        };

        /**
         * Validates the input value to insure it is a valid currency code.
         * 
         * @param {String}
         *            value - The value the object to validate.
         * @throws {TypeError}
         *             The argument value must be a valid currency code.
         */
        function isCurrency(value)
        {
            $log.debug('checking if [' + value + '] is a currency code');
            var msg = '';

            if ( angular.isUndefined(value) || value === null )
            {
                msg = 'argument given is not a currency code';
                $log.error(msg);
                throw new TypeError(msg);
            }
            else if ( !angular.isString(value) )
            {
                msg = 'argument [' + value + '] given is not a currency code';
                $log.error(msg);
                throw new TypeError(msg);
            }
            else if ( value.length !== 3 )
            {
                msg = 'argument [' + value + '] given is not a currency code';
                $log.error(msg);
                throw new TypeError(msg);
            }

            $log.debug('[' + value + '] is a valid currency code');
        }

        function init()
        {
            var defaultValue = 'BRL';

            if ( vm.currency.value )
            {
                defaultValue = vm.currency.value;
            }

            vm.toCurrency(defaultValue);
        }

        // call init() to initialize the default currency to be displayed on the
        // view
        init();
    }

    // annotate the controller function with the parameters to be injected
    CurrencyController.$inject =
    [ '$window', '$timeout', '$log', '$rootScope', '$scope', '$http', 'CONST', 'utilSvc' ];

})();