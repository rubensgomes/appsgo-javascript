(function() {
    /**
     * @file Creates the "appCore" application module.
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
     * @version $Id: app-core.js 592 2015-12-02 22:16:50Z rubens_gomes $
     */

    // place this function in "strict" operating context to prevent "unsafe"
    // actions from happening, and to throw more exceptions.
    'use strict';

    // creates the appCore module
    var appCore = angular.module('appCore', [ 'angularSpinner' ]);

})();
