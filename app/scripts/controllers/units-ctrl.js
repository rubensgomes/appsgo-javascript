(function() {
    /**
     * @file Registers the UnitsController with the appCore module.
     *
     *This controller provides the REST calls to calculate the unit conversion.
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

    // retrieves the appCore created in the app-core.js
    var appCore = angular.module('appCore');
    // registers the UnitsController with the appCore module
    appCore.controller('UnitsController', UnitsController);

    /**
     * The UnitsController constructor.
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
     * @param utilityService-
     *            a utility object to perform some miscellaneous operations.
     * @param CONST -
     *            the global angular constant object defined inside the
     *            'appConstants' module
     */
    function UnitsController ($log, $rootScope, $scope, $http, 
            utilityService, CONST) {
        $rootScope.title = 'Units';
        $scope.error = '';
        $scope.result = '';

        var vm = this;

        vm.doneInput = function(value) {
            $scope.error = '';
            $scope.result = '';

            try {
                utilityService.isNumber(value);
            } catch (err) {
                $scope.error = err.message;
            }

        };

        // ------ >>> Length <<< -------

        vm.lengthUnits = [ {
            label : 'inch',
            value : 'in'
        }, {
            label : 'foot',
            value : 'ft'
        }, {
            label : 'yard',
            value : 'yd'
        }, {
            label : 'mile',
            value : 'mi'
        }, {
            label : 'milimeter',
            value : 'mm'
        }, {
            label : 'meter',
            value : 'm'
        }, {
            label : 'kilometer',
            value : 'km'
        } ];

        vm.fromLengthUnit = vm.lengthUnits[3]; // default
        vm.toLengthUnit = vm.lengthUnits[6]; // default

        vm.convertLength = function(value, fromUnit, toUnit) {
            $scope.error = '';
            $scope.result = '';

            try {
                utilityService.isNumber(value);
                var url = CONST.LENGTH_UNIT_REST_URL + toUnit +
                    '?from_unit=' + fromUnit + '&from_value=' + value; 
                $log.debug('Calling REST URL [' + url + ']');
                $http
                    .get(url)
                    .success( function(data) {
                        $log.debug('REST call succeeded.');
                        $scope.result = data.data.from_value + ' ' + fromUnit +
                            ' = ' + data.data.to_value + ' ' + toUnit;
                    })
                    .error(function(data) {
                        $scope.error = 'REST call [' + url + '] failed.';
                        if(data && data.error && data.error.message)
                        {
                        	$scope.error += ' : ' + data.error.message;
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
            }

        };

        // ------ >>> Mass <<< -------

        vm.massUnits = [ {
            label : 'ounce',
            value : 'oz'
        }, {
            label : 'pound',
            value : 'lb'
        }, {
            label : 'kilogram',
            value : 'kg'
        }, {
            label : 'gram',
            value : 'g'
        } ];

        vm.fromMassUnit = vm.massUnits[1]; // default
        vm.toMassUnit = vm.massUnits[2]; // default

        vm.convertMass = function(value, fromUnit, toUnit) {
            $scope.error = '';
            $scope.result = '';

            try {
                utilityService.isNumber(value);
                var url = CONST.MASS_UNIT_REST_URL + toUnit +
                    '?from_unit=' + fromUnit + '&from_value=' + value; 
                $log.debug('Calling REST URL [' + url + ']');
                $http
                    .get(url)
                    .success(function(data) {
                        $log.debug('REST call succeeded.');
                        $scope.result = data.data.from_value + ' ' + fromUnit +
                            ' = ' + data.data.to_value + ' ' + toUnit;
                    })
                    .error(function(data) {
                        $log.error('REST call failed.');
                        $scope.error = data.error.message;
                    });
            } catch (err) {
                $log.error('REST call failed.');
                $scope.error = err.message;
            }

        };

        // ------ >>> Temperature <<< -------

        vm.cToF = function(value) {
            $scope.error = '';
            $scope.result = '';

            try {
                utilityService.isNumber(value);
                var url = CONST.TEMPERATURE_UNIT_REST_URL + 
                    'degF?from_unit=degC&from_value=' + value;
                $log.debug('Calling REST URL [' + url + ']');
                $http
                    .get(url)
                    .success(function(data) {
                        $log.debug('REST call succeeded.');
                        $scope.result = data.data.from_value + ' &deg;C = ' +
                            data.data.to_value + ' &deg;F';
                    })
                    .error(function(data) {
                        $log.error('REST call failed.');
                        $scope.error = data.error.message;
                    });
            } catch (err) {
                $log.error('REST call failed.');
                $scope.error = err.message;
            }

        };

        vm.fToC = function(value) {
            $scope.error = '';
            $scope.result = '';

            try {
                utilityService.isNumber(value);
                var url = CONST.TEMPERATURE_UNIT_REST_URL + 
                    'degC?from_unit=degF&from_value=' + value;
                $http
                    .get(url)
                    .success(function(data) {
                        $log.debug('REST call succeeded.');
                        $scope.result = data.data.from_value + ' &deg;F = ' +
                            data.data.to_value + ' &deg;C';
                    })
                    .error(function(data) {
                        $log.error('REST call failed.');
                        $scope.error = data.error.message;
                    });
            } catch (err) {
                $log.error('REST call failed.');
                $scope.error = err.message;
            }

        };

    }

    // annotate the UnitsController with the injectable parameters
    UnitsController.$inject = ['$log', '$rootScope', '$scope', '$http', 
                             'utilityService', 'CONST'];
})();
