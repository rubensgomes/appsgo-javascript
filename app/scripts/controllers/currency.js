'use strict';

/**
 * @file Currency controller file
 *
 * @author Rubens Gomes [rubens.s.gomes@gmail.com]
 */


angular.module('rgApps.currency')


/**
 * @constructs CurrencyCtrl controller
 */
.controller('CurrencyCtrl', [
  '$scope',
  '$http',
  '$log',
  'usSpinnerService',
  function($scope, $http, $log, usSpinnerService) {

    var REST_API_URL_PATH = 'https://openexchangerates.org/api/latest.json?' +
      'app_id=30255f99fd69456d8dd50fe9af849aab';

    $scope.error = '';
    $scope.result = '';
    $scope.date = '';

    $scope.currencies = [ {
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
    $scope.currency = $scope.currencies[1]; // default


    /**
     * @description This method is called when the page is load, and it displays
     *              the default currency.
     */
    var init = function() {

      var defaultValue = 'BRL';

      if( $scope.currency.value ) {
        defaultValue = $scope.currency.value;
      }

      $scope.toCurrency(defaultValue);

    };

    /**
     * @description Validates the input value to insure it is a valid currency
     *              code. If a validation error occurs a TypeError exception
     *              is raised..
     *
     * @param {String}
     *          value the object to validate.
     * @throws {TypeError}
     *           argument value must be a valid currency code
     */
    var isCurrency = function(value) {
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

    };

    /**
     * @description Converts USD to the selected currency. The result is
     *              assigned to the $scope.result model object. If an error
     *              occurs, the $scope.error is assigned a message.
     *
     * @param {String}
     *          value the international currency code to convert the U.S.
     *          Dollar to.
     */
    $scope.toCurrency = function(value) {
      $scope.error = '';
      $scope.result = '';
      $scope.date = '';

      try {
        isCurrency(value);
        var url = REST_API_URL_PATH + '&prettyprint';

        usSpinnerService.spin('spinner-1');

        $http.get(url)
          .success(
              function(data) {
                $scope.result = '$1.00 U.S. Dollar = ' +
                  data.rates['' + value] + ' ' + value;
                $scope.date = new Date(data.timestamp * 1000);
                usSpinnerService.stop('spinner-1');
            })
          .error(
              function(data, status) {
                $scope.error = 'HTTP Error [' + status + '] calling [' + url +
                  '] description [' + data.description + ']';
                usSpinnerService.stop('spinner-1');
           });
      } catch (err) {
        $scope.error = err.message;
        usSpinnerService.stop('spinner-1');
      }
    };

    // display default currency data
    init();

  } ]);
