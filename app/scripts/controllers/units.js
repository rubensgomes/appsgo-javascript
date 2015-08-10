'use strict';

/**
 * @file Units (Temperature, Length, Mass) controller file
 *
 * @author Rubens Gomes [rubens.s.gomes@gmail.com]
 */


angular.module('rgApps.units')

/**
 * @constructs UnitsCtrl controller
 */
.controller('UnitsCtrl', [
  '$scope',
  '$http',
  'utilitySvc',
  function($scope, $http, utilitySvc) {

    var REST_API_URL_PATH = 'http://restportal.com/api';

    $scope.error = '';
    $scope.result = '';

    /**
     * @description Validates the input value. If a validation error
     *              occurs, the $scope.error is assigned a message.
     *
     * @param {Number}
     *          value the value to convert.
     */
    $scope.doneInput = function(value) {
      $scope.error = '';
      $scope.result = '';

      try {
        utilitySvc.isNumber(value);
      } catch (err) {
        $scope.error = err.message;
      }
    };


    // ------ >>> Length <<< -------


    $scope.lengthUnits = [ {
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
    $scope.fromLengthUnit = $scope.lengthUnits[3]; // default
    $scope.toLengthUnit = $scope.lengthUnits[6]; // default


    /**
     * @description Converts value using fromUnit to toUnit. The converted
     *              result is assigned to the $scope.result model object. If a
     *              validation error occurs, the $scope.error is assigned a
     *              message.
     *
     * @param {Number}
     *          value the value to convert.
     * @param {String}
     *          fromUnit the from length unit.
     * @param {String}
     *          toUnit the to length unit.
     *
     */
    $scope.convertLength = function(value, fromUnit, toUnit) {
      $scope.error = '';
      $scope.result = '';

      // RESTportal.com RESTFul API call
      try {
        $http.get(
            REST_API_URL_PATH + '/length/' + toUnit +
              '?from_unit=' + fromUnit + '&from_value=' + value
              ).success(
              function(data) {
                $scope.result = data.data.from_value + ' ' + fromUnit +
                  ' = ' + data.data.to_value + ' ' + toUnit;
            }).error(function(data) {
          $scope.error = data.error.message;
        });
      } catch (err) {
        $scope.error = err.message;
      }
    };


    // ------ >>> Weight (sames as Mass) <<< -------


    $scope.massUnits = [ {
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
    $scope.fromMassUnit = $scope.massUnits[1]; // default
    $scope.toMassUnit = $scope.massUnits[2]; // default


    /**
     * @description Converts value using fromUnit to toUnit. The
     *              converted result is assigned to the $scope.result
     *              model object. If a validation error occurs, the
     *              $scope.error is assigned a message.
     *
     * @param {Number}
     *            value the value to convert.
     * @param {String}
     *            fromUnit the from mass unit.
     * @param {String}
     *            toUnit the to mass unit.
     *
     */
    $scope.convertMass = function(value, fromUnit, toUnit) {
        $scope.error = '';
        $scope.result = '';

        // RESTportal.com RESTFul API call
        try {
            $http.get(REST_API_URL_PATH + '/weight/' + toUnit +
                    '?from_unit=' + fromUnit + '&from_value=' + value)
              .success(function(data) {
                 $scope.result = data.data.from_value + ' ' + fromUnit +
                 ' = ' + data.data.to_value + ' ' + toUnit;
               })
              .error(function(data) {
                 $scope.error = data.error.message;
               });
        } catch (err) {
            $scope.error = err.message;
        }
    };


    // ------ >>> Temperature <<< -------


    /**
     * @description Converts C (Celsius) to F (Fahrenheit). The
     *              converted result is assigned to the $scope.result
     *              model object. If a validation error occurs, the
     *              $scope.error is assigned a message.
     *
     * @param {Number}
     *            value the temperature value to convert.
     */
    $scope.cToF = function(value) {
        $scope.error = '';
        $scope.result = '';

        // RESTportal.com RESTFul API call
        try {
            $http.get(REST_API_URL_PATH +
                '/temperature/degF?from_unit=degC&from_value=' + value)
              .success(function(data) {
                 $scope.result = data.data.from_value + ' &deg;C = ' +
                     data.data.to_value + ' &deg;F';
               })
              .error(function(data) {
                 $scope.error = data.error.message;
               });
        } catch (err) {
            $scope.error = err.message;
        }

    };

    /**
     * @description Converts F (Fahrenheit) to C (Celsius). The
     *              converted result is assigned to the $scope.result
     *              model object. If a validation error
     *
     * @param {Number}
     *            the temperature value to convert.
     */
    $scope.fToC = function(value) {
        $scope.error = '';
        $scope.result = '';

        // RESTportal.com RESTFul API call
        try {
            $http.get(REST_API_URL_PATH +
                '/temperature/degC?from_unit=degF&from_value=' + value)
              .success(function(data) {
                 $scope.result = data.data.from_value + ' &deg;F = ' +
                     data.data.to_value + ' &deg;C';
               })
              .error(function(data) {
                 $scope.error = data.error.message;
               });
        } catch (err) {
            $scope.error = err.message;
        }
    };

  } ]);
