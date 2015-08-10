'use strict';

/**
 * @file playground controller file
 *
 * @author Rubens Gomes [rubens.s.gomes@gmail.com]
 * @version $Id: iot.js 7767 2015-03-17 13:14:41Z rubens $
 */

angular.module('rgApps.playground')


/**
 * @constructs PlaygroundCtrl controller
 */
.controller('PlaygroundCtrl', [
  '$scope',
  '$http',
  function($scope, $http) {

    $scope.clearAnswers = function () {
      $scope.answerN = "";
      $scope.answerNAfter = "";
      $scope.answer1 = "";
      $scope.answer2 = "";
      $scope.answer3 = "";
      $scope.answer4 = "";
      $scope.answer5 = "";
    }

    $scope.clearAnswer1 = function () {
      $scope.answer1 = "";
      $scope.answerN = "";
      $scope.answerNAfter = "";
    }

    $scope.clearAnswer2 = function () {
      $scope.answer2 = "";
    }

    $scope.clearAnswer3 = function () {
      $scope.answer3 = "";
    }

    $scope.clearAnswer4 = function () {
      $scope.answer4 = "";
    }

    $scope.clearAnswer5 = function () {
      $scope.answer5 = "";
    }

    // ----Function Argument Passing----------------------------------------

    // Answer 1
    function num(n) {
      $scope.answerN = "n is [ " + n + " ]";
      n = 2;
      $scope.answerNAfter = "n is now [ " + n + " ]";
    };

    $scope.whatIsX1 = function () {
      var x = 1;
      num(x);
      $scope.answer1 = "x is [ " + x + " ]";
    };


    // Answer 2
    function str(s) {
      s = "vasco";
    };

    $scope.whatIsX2 = function () {
      var x = "hello";
      str(x);
      $scope.answer2 = "x is [ " + x + " ]";
    };


    // Answer 3
    function foo(bar) {
      bar = null;
    };

    $scope.whatIsX3 = function () {
      var x = [];
      foo(x);
      $scope.answer3 = "x is [ " + x + " ]. " +
      "Notice, \"bar\" is a variable in the stack of the \"foo\" " +
      "function. Therefore, changing its value to null has no efect on the \"x\" " +
      "array object.";
    };


    // Answer 4
    function bar(foo) {
      foo[0] = "test";
    };

    $scope.whatIsX4 = function () {
      var x = [];
      bar(x);
      $scope.answer4 = "x is [ " + x + " ]. " +
      "Notice, \"foo\" has de-referenced the actual object. " +
      "Therefore, \"foo[0]\" is now the actual array object passed as " +
      "a reference to the bar function.";
    };


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
    };

    $scope.whatIsX5 = function () {
      var x = new HelloWorld("hello", "world");
      hello(x);
      $scope.answer5 = "x is [ " + x.foo + " " + x.bar +  " ]";
    };

  } ]);