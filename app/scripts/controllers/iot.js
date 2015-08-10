'use strict';

/**
 * @file IoT controller file
 *
 * @author Rubens Gomes [rubens.s.gomes@gmail.com]
 * @version $Id: iot.js 7767 2015-03-17 13:14:41Z rubens $
 */

angular.module('rgApps.iot')

/**
 * @constructs filter to convert date formatted string to date
 */
.filter('asDate', function () {
    return function (input) {
        return new Date(input);
    };
})

/**
 * @constructs filter to convert temperature to its simbol
 */
.filter('asDegreeSymbol', function () {
    return function (input) {
      var reC = /celsius/i;
      var reF = /fahrenheit/i;
      var reK = /kelvin/i;

      if (input) {
        if (input.match(reC)) {
          return ' °C';
        }
        else if (input.match(reF)) {
          return ' °F';
        }
        else if (input.match(reK)) {
          return ' °K';
        }
        else {
          return input;
        }
      }
      else {
        return input;
      }

    };
})


/**
 * @constructs IoTCtrl controller
 */
.controller('IoTCtrl', [
  '$scope',
  '$http',
  'usSpinnerService',
  function($scope, $http, usSpinnerService) {

    /**
     * A data object consisting of the sensor temperature data extracted
     * from the sensor analytics RESTFul API.
     */
    function SensorTemperature(unit, value, utc) {
      this.unit = unit;
      this.value = value;
      this.utc = utc;
    }

    /**
     * The temperature sensor data to be exposed to the view.
     */
    $scope.sensorData = [];

    /**
     * The error object to be exposed to the view in the event of an error.
     */
    $scope.error = '';

    /**
     * The Sensor Temperature RESTFul API URL.
     */
    var REST_API_URL_PATH =
      'http://restportal.com:80/api/analytics/temperature/sensors/000006c01f0b';

    /**
     * All the possible durations that may be used when retrieving data from
     * the Sensor Temperature RESTFul API.
     */
    $scope.durations = [ {
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
    $scope.duration = $scope.durations[12]; // default

    var restUrl = REST_API_URL_PATH + '?duration=' + $scope.duration.value;

    /**
     * @description This method is called when the page is load, and it displays
     *              the default IoT graph.
     */
    var init = function() {

      var defaultDuration = 'last7Days';

      if( $scope.duration.value ) {
        defaultDuration = $scope.duration.value;
      }

      $scope.getTemperatureData(defaultDuration);

    };

    /**
     * @description Retrieves sensor temperature data from REST API which is
     *              used for the chart drawing.
     *
     * @param {String}
     *          duration the duration for the temperature data.
     */
    $scope.getTemperatureData = function (duration) {

      // RESTportal.com RESTFul API call
      try {
        $scope.duration.value = duration;

        $scope.sensorData = [];
        $scope.sensorData.length = 0;

        $scope.chart.series = [];
        $scope.chart.series.length = 0;

        usSpinnerService.spin('spinner-1');

        restUrl = REST_API_URL_PATH + '?duration=' + duration;
        $http.get(restUrl)
          .success(function(result) {
            var index; var element; var localData = [];
            for (index = 0; index < result.data.length; ++index) {
              element = result.data[index];
              $scope.sensorData.push(new SensorTemperature(element.unit,
                  element.value, element.utc));
              localData.push(element.value);
            }
            $scope.chart.series.push(localData);
            usSpinnerService.stop('spinner-1');
           })
          .error(function(data) {
             $scope.error = data.error.message;
             usSpinnerService.stop('spinner-1');
           });
      } catch (err) {
        $scope.error = err.message;
      }

    };

    /**
     * @description HighCharts-ng chart object.
     */
    $scope.chart = {

      chart: {
        type: 'line'
      },

      title: {
        text: 'Rubens Home Temperature'
      },

      subtitle: {
        text: restUrl
      },

      tooltip: {
        pointFormat: '{point.x:%e. %b}: {point.y:.2f} °C'
      },

      xAxis: {
        type: 'datetime',
        title: {
            text: 'Date'
        }
      },

      yAxis: {
        title: {
          text: 'Temperature (°C)'
        }
      },

      plotOptions: {
        line: {
            dataLabels: {
                enabled: true
            },
            enableMouseTracking: false
        }
      },

      series: [{
        data: []
     }]

    };

    // initialize the chart series data
    init();

  } ]);