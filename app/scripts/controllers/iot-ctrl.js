(function(){
    /**
     * @file IoT controller file.
     * 
     * @author Rubens Gomes [rubens.s.gomes@gmail.com].
     * @version $Id: iot-ctrl.js 428 2015-09-21 18:47:38Z rubens_gomes $
     */
    'use strict';

    angular
        .module('app-core')
        .controller('IoTController', IoTController);

    function IoTController($log, $rootScope, $scope, $http, 
            usSpinnerService, CONST) {
        $rootScope.title = 'IoT';
        $scope.error = '';

        var vm = this;

        /**
         * The temperature sensor data to be exposed to the view.
         */
        vm.sensorData = [];

        /**
         * All the possible durations that may be used when retrieving data from
         * the Sensor Temperature RESTFul API.
         */
        vm.durations = [ {
            label : 'Last 5 Years',
            value : 'last5Years'
        }, {
            label : 'Last 1 Year',
            value : 'last1Year'
        }, {
            label : 'Last 6 Months',
            value : 'last6Months'
        }, {
            label : 'Last 90 Days',
            value : 'last90Days'
        }, {
            label : 'Last 60 Days',
            value : 'last60Days'
        }, {
            label : 'Last 30 Days',
            value : 'last30Days'
        }, {
            label : 'Last 21 Days',
            value : 'last21Days'
        }, {
            label : 'Last 7 Days',
            value : 'last7Days'
        }, {
            label : 'Last 3 Days',
            value : 'last3Days'
        }, {
            label : 'Last Day',
            value : 'lastDay'
        }, {
            label : 'Last 24 Hours',
            value : 'last24Hours'
        }, {
            label : 'Last 12 Hours',
            value : 'last12Hours'
        }, {
            label : 'Last 6 Hours',
            value : 'last6Hours'
        }, {
            label : 'Last Hour',
            value : 'lastHour'
        }];
        vm.duration = vm.durations[12]; // default

        /**
         * Retrieves sensor temperature readings from the Sensor Temperature 
         * REST API.
         *
         * @param duration {string} - The duration for the temperature data.
         */
        vm.getTemperatureData = function (duration) {
            vm.duration.value = duration;
            vm.sensorData = [];
            vm.sensorData.length = 0;

            var restUrl = CONST.TEMPERATURE_REST_URL + '?duration=' + 
                vm.duration.value;

            try {
                usSpinnerService.spin('spinner-1');
                $log.debug('Calling REST URL [' + restUrl + ']');
                $http
                    .get(restUrl)
                    .success(function(result) {
                        $log.debug('REST call succeeded.');
                        var index, element;
                        for (index = 0; index < result.data.length; ++index) {
                            element = result.data[index];
                            vm.sensorData.push(
                                    new SensorTemperature(index, element.unit, 
                                            element.value, element.utc));
                        }
                    })
                    .error(function(data) {
                        $log.error('REST call failed.');
                        $scope.error = data.error.message;
                    });
            } catch (err) {
                $log.error('REST call failed.');
                $scope.error = err.message;
            } finally {
                usSpinnerService.stop('spinner-1');
            }
        };

        function SensorTemperature(index, unit, value, utc) {
            this.index = index;
            this.unit = unit;
            this.value = value;
            this.utc = utc;
        }

        function init() {
            $log.debug('IoTController init called.');
            vm.getTemperatureData(vm.duration.value);
        }

        // initialize the template when it is loaded
        init();
    }
    
    IoTController.$inject = ['$log', '$rootScope', '$scope', '$http', 
                             'usSpinnerService', 'CONST'];

})();
