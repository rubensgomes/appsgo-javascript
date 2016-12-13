(function ()
{
    /**
     * @file Registers the UnitsController with the app module.
     * 
     * This controller provides the REST calls to calculate the unit conversion.
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

    // retrieves the app created in the app.js
    var app = angular.module('app');

    // registers the UnitsController with the app module
    app.controller('UnitsController', UnitsController);

    /**
     * The UnitsController constructor.
     * 
     * @param {$timeout}
     *            $timeout - the window timeout object.
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
     * @param utilSvc-
     *            a utility object to perform some miscellaneous operations.
     * @param CONST -
     *            the global angular constant object defined inside the
     *            'appConstants' module
     */
    function UnitsController($timeout, $log, $rootScope, $scope, $http, utilSvc, CONST)
    {
        $rootScope.title = 'Units';
        $scope.error = '';
        $scope.result = '';

        var vm = this;

        vm.doneInput = function (value)
        {
            $scope.error = '';
            $scope.result = '';

            try
            {
                utilSvc.isNumber(value);
            }
            catch (err)
            {
                $scope.error = err.message;
            }

        };

        // ------ >>> Length <<< -------

        vm.lengthUnits =
        [
        {
            label : 'inch',
            value : 'in'
        },
        {
            label : 'foot',
            value : 'ft'
        },
        {
            label : 'yard',
            value : 'yd'
        },
        {
            label : 'mile',
            value : 'mi'
        },
        {
            label : 'milimeter',
            value : 'mm'
        },
        {
            label : 'meter',
            value : 'm'
        },
        {
            label : 'kilometer',
            value : 'km'
        } ];

        vm.fromLengthUnit = vm.lengthUnits[3]; // default
        vm.toLengthUnit = vm.lengthUnits[6]; // default

        vm.convertLength = function (value, fromUnit, toUnit)
        {
            $scope.error = '';
            $scope.result = '';

            var url = CONST.LENGTH_UNIT_REST_URL + toUnit + '?from_unit=' + fromUnit + '&from_value=' + value;
            try
            {
                utilSvc.isNumber(value);
                $log.debug('Calling REST URL [' + url + ']');

                $http(
                {
                    method : 'GET',
                    url : url
                }).then(function successCallback(response)
                {
                    $log.debug('REST call succeeded.');
                    if ( response.data && response.data.data )
                    {
                        var myData = response.data.data;
                        $scope.result = myData.from_value + ' ' + fromUnit + 
                            ' = ' + myData.to_value + ' ' + toUnit;
                    }
                    else
                    {
                        $log.error('response.data.data not found.')
                    }
                }, function errorCallback(response)
                {
                    $scope.error = 'REST call [' + url + '] failed.';
                    if ( response.data && response.data.error && response.data.error.message )
                    {
                        $scope.error += ' : ' + response.data.error.message;
                    }
                    $scope.error += '. status : ' + response.status + '. error : '
                                    + response.statusText;
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
                $log.debug('finally block called.');
            }

        };

        // ------ >>> Mass <<< -------

        vm.massUnits =
        [
        {
            label : 'ounce',
            value : 'oz'
        },
        {
            label : 'pound',
            value : 'lb'
        },
        {
            label : 'kilogram',
            value : 'kg'
        },
        {
            label : 'gram',
            value : 'g'
        } ];

        vm.fromMassUnit = vm.massUnits[1]; // default
        vm.toMassUnit = vm.massUnits[2]; // default

        vm.convertMass = function (value, fromUnit, toUnit)
        {
            $scope.error = '';
            $scope.result = '';

            try
            {
                utilSvc.isNumber(value);
                var url = CONST.MASS_UNIT_REST_URL + toUnit + '?from_unit=' + fromUnit + '&from_value='
                        + value;
                $log.debug('Calling REST URL [' + url + ']');

                $http(
                {
                    method : 'GET',
                    url : url
                }).then(function successCallback(response)
                {
                    $log.debug('REST call succeeded.');
                    if ( response.data && response.data.data )
                    {
                        var myData = response.data.data;
                        $scope.result = myData.from_value + ' ' + fromUnit + ' = '
                                    + myData.to_value + ' ' + toUnit;
                    }
                    else
                    {
                        $log.error('response.data.data not found.')
                    }
                }, function errorCallback(response)
                {
                    $scope.error = 'REST call [' + url + '] failed.';
                    if ( response.data && response.data.error && response.data.error.message )
                    {
                        $scope.error += ' : ' + response.data.error.message;
                    }
                    $scope.error += '. status : ' + response.status + '. error : '
                                            + response.statusText;
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
                $log.debug('finally block called.');
            }
        };

        // ------ >>> Temperature <<< -------

        vm.cToF = function (value)
        {
            $scope.error = '';
            $scope.result = '';

            try
            {
                utilSvc.isNumber(value);
                var url = CONST.TEMPERATURE_UNIT_REST_URL + 'degF?from_unit=degC&from_value=' + value;
                $log.debug('Calling REST URL [' + url + ']');

                $http(
                {
                    method : 'GET',
                    url : url
                }).then(function successCallback(response)
                {
                    $log.debug('REST call succeeded.');
                    if ( response.data && response.data.data )
                    {
                        var myData = response.data.data;
                        $scope.result = myData.from_value + ' &deg;C = ' + 
                                    myData.to_value + ' &deg;F';
                    }
                    else
                    {
                        $log.error('response.data.data not found.')
                    }
                }, function errorCallback(response)
                {
                    $scope.error = 'REST call [' + url + '] failed.';
                    if ( response.data && response.data.error && response.data.error.message )
                    {
                        $scope.error += ' : ' + response.data.error.message;
                    }
                    $scope.error += '. status : ' + response.status + '. error : '
                                                    + response.statusText;
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
                $log.debug('finally block called.');
            }
        };

        vm.fToC = function (value)
        {
            $scope.error = '';
            $scope.result = '';

            try
            {
                utilSvc.isNumber(value);
                var url = CONST.TEMPERATURE_UNIT_REST_URL + 'degC?from_unit=degF&from_value=' + value;

                $http(
                {
                    method : 'GET',
                    url : url
                }).then(function successCallback(response)
                {
                    $log.debug('REST call succeeded.');
                    if ( response.data && response.data.data )
                    {
                        var myData = response.data.data;
                        $scope.result = myData.from_value + ' &deg;F = ' 
                                    + myData.to_value + ' &deg;C';
                    }
                    else
                    {
                        $log.error('response.data.data not found.')
                    }
                }, function errorCallback(response)
                {
                    $scope.error = 'REST call [' + url + '] failed.';
                    if ( response.data && response.data.error && response.data.error.message )
                    {
                        $scope.error += ' : ' + response.data.error.message;
                    }
                    $scope.error += '. status : ' + response.status + '. error : '
                                                            + response.statusText;
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
                $log.debug('finally block called.');
            }
        };

    }

    // annotate the UnitsController with the injectable parameters
    UnitsController.$inject =
    [ '$timeout', '$log', '$rootScope', '$scope', '$http', 'utilSvc', 'CONST' ];
})();
