(function() {
    /**
     * @file File that defines constants used in the application.
     *
     * @author Rubens Gomes [rubens.s.gomes@gmail.com].
     * @version $Id: app-constants.js 500 2015-11-06 01:48:02Z rubens_gomes $
     */
    'use strict';

    angular
        .module('app-constants', [])
        .constant('CONST', {
            MIN_SEARCH_TEXT_LEN : 3,
            LENGTH_UNIT_REST_URL : 'http://api.restportal.com:80/length/',
            MASS_UNIT_REST_URL : 'http://api.restportal.com:80/weight/',
            TEMPERATURE_UNIT_REST_URL : 'http://api.restportal.com:80/temperature/',
            TEMPERATURE_REST_URL : 'http://api.restportal.com:80/analytics/temperature/sensors/000006c01f0b',
            CURRENCY_REST_URL : 'https://openexchangerates.org/latest.json?app_id=30255f99fd69456d8dd50fe9af849aab'
        });

})();