(function() {
    /**
     * @file javascript controller file
     *
     * @author Rubens Gomes [rubens.s.gomes@gmail.com]
     * @version $Id: javascript-ctrl.js 424 2015-09-17 04:01:02Z rubens_gomes $
     */
    'use strict';

    angular
        .module('app-core')
        .controller('JavaScriptController', JavaScriptController);

    function JavaScriptController ($rootScope) {
        $rootScope.title = 'JavaScript';

        var vm = this;

        vm.clearAnswers = function () {
              vm.answerN = "";
              vm.answerNAfter = "";
              vm.answer1 = "";
              vm.answer2 = "";
              vm.answer3 = "";
              vm.answer4 = "";
              vm.answer5 = "";
        };

        vm.clearAnswer1 = function () {
              vm.answer1 = "";
              vm.answerN = "";
              vm.answerNAfter = "";
        };

        vm.clearAnswer2 = function () {
            vm.answer2 = "";
        };

        vm.clearAnswer3 = function () {
            vm.answer3 = "";
        };

        vm.clearAnswer4 = function () {
            vm.answer4 = "";
        };

        vm.clearAnswer5 = function () {
            vm.answer5 = "";
        };

        vm.whatIsX1 = function  () {
            var x = 1;
            num(x);
            vm.answer1 = "x is [ " + x + " ]";
        };

        vm.whatIsX2 = function () {
            var x = "hello";
            str(x);
            vm.answer2 = "x is [ " + x + " ]";
        };

        vm.whatIsX3 = function () {
            var x = [];
            foo(x);
            vm.answer3 = "x is [ " + x + " ]. " +
                "Notice, \"bar\" is a variable in the stack of the \"foo\" " +
                "function. Therefore, changing its value to null has no efect on the \"x\" " +
                "array object.";
        };

        vm.whatIsX4 = function  () {
            var x = [];
            bar(x);
            vm.answer4 = "x is [ " + x + " ]. " +
                "Notice, \"foo\" has de-referenced the actual object. " +
                "Therefore, \"foo[0]\" is now the actual array object passed as " +
                "a reference to the bar function.";
        };

        vm.whatIsX5 = function () {
            var x = new HelloWorld("hello", "world");
            hello(x);
            vm.answer5 = "x is [ " + x.foo + " " + x.bar +  " ]";
        };

        // ----Function Argument Passing----------------------------------------

        // Answer 1
        function num(n) {
              vm.answerN = "n is [ " + n + " ]";
              n = 2;
              vm.answerNAfter = "n is now [ " + n + " ]";
        }

        // Answer 2
        function str(s) {
              s = "vasco";
        }

        // Answer 3
        function foo(bar) {
            bar = null;
        }

        // Answer 4
        function bar(foo) {
            foo[0] = "test";
        }

        // Answer 5
        function HelloWorld(a, b) {
            // constructor for HelloWorld object
            this.foo = a;
            this.bar = b;
        }

        function hello(anObj) {
            if(anObj instanceof HelloWorld) {
                anObj.foo = "Vasco";
                anObj.bar = " da Gama";
            }
        }

    }

    JavaScriptController.$inject = ['$rootScope'];

})();
