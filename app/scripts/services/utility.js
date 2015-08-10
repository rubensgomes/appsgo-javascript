'use strict';

/**
 * @file Utility service file *
 *
 * @author Rubens Gomes [rubens.s.gomes@gmail.com]
 */


angular.module('rgApps.main')


/**
 * @constructs utilitySvc service
 */
.service('utilitySvc', [
  '$http',
  '$q',
  '$log',
  function($http, $q, $log) {

    /**
     * @description Validates the input value to insure it is a number. If a
     *              validation error occurs a TypeError exception is raised..
     *
     * @param {Number}
     *          value the object to validate.
     * @throws {TypeError}
     *           argument value must be a number
     */
    this.isNumber = function(value) {
      $log.debug('checking if [' + value + '] is a number');
      var msg = '';

      if (angular.isUndefined(value) || value === null) {
        msg = 'argument given is not a number';
        $log.error(msg);
        throw new TypeError(msg);
      } else if (!angular.isNumber(value)) {
        msg = '[' + value + '] is not a number.';
        $log.error(msg);
        throw new TypeError(msg);
      }

    };


    /**
     * @description Validates the input value to ensure it contains enough
     *              text to search
     *
     * @param {String}
     *          value the object to validate.
     * @throws {TypeError}
     *           argument value must be a valid search text
     */
    this.isSearchText = function(value) {
      $log.debug('checking if [' + value + '] is a text with enougth content');
      var msg = '';

      if (angular.isUndefined(value) || value === null) {
        msg = 'argument given is not a text';
        $log.error(msg);
        throw new TypeError(msg);
      } else {
        var searchText = $.trim(value);
        if(searchText.length < 3) {
          msg = 'argument given needs to have at least 3 characters';
          $log.error(msg);
          throw new TypeError(msg);
        }
      }

    };

  } ]);