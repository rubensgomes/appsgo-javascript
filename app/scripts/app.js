(function() {
  /**
   * @file File used to define the main application module and its
   * dependencies.
   *
   * @author Rubens Gomes [rubens.s.gomes@gmail.com]
   * @version $Id: app.js 424 2015-09-17 04:01:02Z rubens_gomes $
   */
  'use strict';

  /*
   * Note:
   * 
   * When defining a module with no module dependencies, 
   * the array of dependencies should be defined empty.
   * To retrieve a reference to the same module for further 
   * configuration, call angular.module without the array argument.
   *
   * Calling angular.module without the array of dependencies when
   * the module has not yet been defined causes this Error:
   * 
   *  error:nomod Module Unavailable error to be thrown.
   *  
   * To fix it, we define all our modules next .  
   */

  angular.module('app', [ 'ngRoute', 'ngTouch', 'ngSanitize', 
                          'app-core', 'app-constants', 'app.routes']);

})();
