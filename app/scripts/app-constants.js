(function() {
    /**
     * @file File that defines constants used in the application.
     *
     * @author Rubens Gomes [rubens.s.gomes@gmail.com].
     * @version $Id: app-constants.js 428 2015-09-21 18:47:38Z rubens_gomes $
     */
    'use strict';

    angular
        .module('app-constants', [])
        .constant('CONST', {
            MIN_SEARCH_TEXT_LEN : 3,
            LENGTH_UNIT_REST_URL : 'http://restportal.com:80/api/length/',
            WEIGHT_UNIT_REST_URL : 'http://restportal.com:80/api/weight/',
            TEMPERATURE_UNIT_REST_URL : 'http://restportal.com:80/api/temperature/',
            TEMPERATURE_REST_URL : 'http://restportal.com:80/api/analytics/temperature/sensors/000006c01f0b',
            CURRENCY_REST_URL : 'https://openexchangerates.org/api/latest.json?app_id=30255f99fd69456d8dd50fe9af849aab'
        });

})();