(function() {
    /**
     * @file A file where simple controllers are defined.
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
     * @version $Id: main-ctrl.js 595 2015-12-02 22:32:27Z rubens_gomes $
     */

    // place this function in "strict" operating context to prevent "unsafe"
    // actions from happening, and to throw more exceptions.
    'use strict'; 

    // retrieves the appCore module created in app-core.js
    var appCore = angular.module('appCore');

    // registers AboutController and HomeController in appCore
    appCore.controller('AboutController', AboutController);
    appCore.controller('HomeController', HomeController);

    /**
     * The AboutController constructor.
     * 
     * @param {$RootScopeProvider}
     *            $rootScope - the global and unique scope object that used to
     *            configure the page title.
     */
    function AboutController($rootScope) {
        $rootScope.title = 'About';
    }

    /**
     * The HomeController constructor.
     * 
     * @param {$RootScopeProvider}
     *            $rootScope - the global and unique scope object that used to
     *            configure the page title.
     */
    function HomeController($rootScope) {
        $rootScope.title = 'Welcome';

        $rootScope.$on('$routeChangeStart', function() {
            $rootScope.loading = true;
        });

        $rootScope.$on('$routeChangeSuccess', function() {
            $rootScope.loading = false;
        });
    }

    // annotate controllers with injectable parameters
    AboutController.$inject = ['$rootScope'];
    HomeController.$inject = ['$rootScope'];

})();