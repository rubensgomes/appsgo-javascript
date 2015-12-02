(function() {
    /**
     * @file Registers common filters with the "appCore" module. 
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
     * @version $Id: main-filter.js 596 2015-12-02 22:37:38Z rubens_gomes $
     */

    // place this function in "strict" operating context to prevent "unsafe"
    // actions from happening, and to throw more exceptions.
    'use strict';

    // retrieves an appCore module previously created in app-core.js
    var appCore = angular.module('appCore');

    // registers some filters with appCore
    appCore.filter('asDate', asDate);
    appCore.filter('asDegreeSymbol', asDegreeSymbol);

    function asDate() {
        return function(input) {

            if (!input) {
                throw new TypeError('input is undefined or null."');
            }

            return new Date(input);
        };
    }

    function asDegreeSymbol() {
        return function(input) {

            if (!input) {
                throw new TypeError('input is undefined or null.');
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

        };
    }

})();