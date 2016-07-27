(function(){
    /**
     * @file IoT controller file.
     *
     * This controller connects with a REST service to retrieve past temperature
     * sensor readings from Rubens IOT sensor at his home.
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

    // retrieves 'app' module created in app.js
    var app= angular.module('app');

    // register IoTController to app
    app.controller('IoTController', IoTController);

    /**
     * The IoT controller provides a REST call to retrieve past temperature
     * readings from Rubens IoT RESTful service.
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
     * @param CONST -
     *            the global angular constant object defined inside the
     *            'appConstants' module
     */
    function IoTController($timeout, $log, $rootScope, $scope, $http,
            CONST) {
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
         *
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
        */

        vm.durations = [ {
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
        vm.duration = vm.durations[5]; // default

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
                        $scope.error = 'REST call [' + restUrl + '] failed.';
                        if(data && data.error && data.error.message)
                        {
                        	$scope.error += ' : ' + data.error.message;
                        }
                        $log.error($scope.error);
                    });
            } catch (err) {
                $scope.error = 'REST call [' + restUrl + '] failed.';
                if(err && err.message)
                {
                	$scope.error += ' : ' + err.message;
                }
                $log.error($scope.error);
            } finally {
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

    // Annotate the IoTController with the injectable parameters
    IoTController.$inject = ['$timeout', '$log', '$rootScope', '$scope', '$http',
                             'CONST'];

})();
