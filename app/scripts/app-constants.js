(function() {
    /**
     * @file Creates the "appConstants" module used to define global constants
     * to be used in the application.
     *
     * NOTE: Javascript variables have two scopes: function and global.
     * 
     * Notice that we are declaring self invoking anonymous function
     * expressions; that is, "(function() {...}).();". This programming practice
     * allows any variable declared within the scope of the annonymous function
     * to be encapsulated and only visible within the scope and execution of
     * that function. Therefore, it prevents the pollution of the global scope.
     * 
     * @author Rubens Gomes [rubens.s.gomes@gmail.com]
     * @version $Id: app-constants.js 592 2015-12-02 22:16:50Z rubens_gomes $
     */

    // place this function in "strict" operating context to prevent "unsafe"
    // actions from happening, and to throw more exceptions.
    'use strict';

    var appConstants = angular.module('appConstants', []);
    appConstants.constant('CONST', {
            MIN_SEARCH_TEXT_LEN : 3,
            LENGTH_UNIT_REST_URL : 'http://appsgo.mobi/restportal/length/',
            MASS_UNIT_REST_URL : 'http://appsgo.mobi/restportal/weight/',
            TEMPERATURE_UNIT_REST_URL : 'http://appsgo.mobi/restportal/temperature/',
            TEMPERATURE_REST_URL : 'http://appsgo.mobi/restportal/analytics/temperature/sensors/000006c01f0b',
            CURRENCY_REST_URL : 'https://appsgo.mobi/currency/latest.json?app_id=30255f99fd69456d8dd50fe9af849aab'
        });

})();
