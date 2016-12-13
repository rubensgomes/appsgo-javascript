(function ()
{
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
     * @author Rubens Gomes
     */

    // place this function in "strict" operating context to prevent "unsafe"
    // actions from happening, and to throw more exceptions.
    'use strict';

    // retrieves the app module created in app.js
    var app = angular.module('app');

    // registers AboutController and HomeController in app
    app.controller('AboutController', AboutController);
    app.controller('HomeController', HomeController);

    /**
     * The AboutController constructor.
     * 
     * @param {$RootScopeProvider}
     *            $rootScope - the global and unique scope object that used to
     *            configure the page title.
     */
    function AboutController($rootScope)
    {
        $rootScope.title = 'About';
    }

    /**
     * The HomeController constructor.
     * 
     * @param {$RootScopeProvider}
     *            $rootScope - the global and unique scope object that used to
     *            configure the page title.
     */
    function HomeController($rootScope)
    {
        $rootScope.title = 'Welcome';

        $rootScope.$on('$routeChangeStart', function ()
        {
            $rootScope.loading = true;
        });

        $rootScope.$on('$routeChangeSuccess', function ()
        {
            $rootScope.loading = false;
        });
    }

    // annotate controllers with injectable parameters
    AboutController.$inject =
    [ '$rootScope' ];
    HomeController.$inject =
    [ '$rootScope' ];

})();