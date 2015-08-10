'use strict';

/**
 * @file Main controller file
 *
 * @author Rubens Gomes [rubens.s.gomes@gmail.com]
 */


angular.module('rgApps.main')


/**
 * @constructs MainCtrl controller
 */
.controller('MainCtrl',
    function($rootScope) {

  $rootScope.$on('$routeChangeStart', function() {
    $rootScope.loading = true;
  });

  $rootScope.$on('$routeChangeSuccess', function() {
    $rootScope.loading = false;
  });

});
