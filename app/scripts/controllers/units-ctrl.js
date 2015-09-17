(function() {
    /**
     * @file UnitsController file.
     *
     * @author Rubens Gomes [rubens.s.gomes@gmail.com].
     * @version $Id: units-ctrl.js 424 2015-09-17 04:01:02Z rubens_gomes $
     */
    'use strict';

    angular
        .module('app-core')
        .controller('UnitsController', UnitsController);

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
                        $log.error('REST call failed.');
                        $scope.error = data.error.message;
                    });
            } catch (err) {
                $log.error('REST call failed.');
                $scope.error = err.message;
            }

        };

        // ------ >>> Weight (sames as Mass) <<< -------

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
                var url = CONST.WEIGHT_UNIT_REST_URL + toUnit +
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

    UnitsController.$inject = ['$log', '$rootScope', '$scope', '$http', 
                             'utilityService', 'CONST'];
})();
