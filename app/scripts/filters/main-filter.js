(function() {
    /**
     * @file A file where common filters are defined.
     *
     * @author Rubens Gomes [rubens.s.gomes@gmail.com]
     * @version $Id: main-filter.js 424 2015-09-17 04:01:02Z rubens_gomes $
     */

    'use strict';

    angular
        .module('app-core')
        .filter('asDate', asDate)
        .filter('asDegreeSymbol', asDegreeSymbol);

    function asDate () {
        return function (input) {

            if (! input) {
                throw new TypeError("input is undefined or null.")
            }

            return new Date(input);
        };
    }

    function asDegreeSymbol() {
        return function (input) {

            if (! input) {
                throw new TypeError("input is undefined or null.")
            }

            var reC = /degC/i;
            var reF = /degF/i;
            var reK = /degK/i;

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
    }

})();