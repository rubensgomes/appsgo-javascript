'use strict';

/**
 * @file Agile controller file
 *
 * @author Rubens Gomes [rubens.s.gomes@gmail.com]
 * @version $Id: agile.js 424 2015-09-17 04:01:02Z rubens_gomes $
 */

angular.module('rgapps.agile')


/**
 * @constructs AgileCtrl controller
 */
.controller('AgileCtrl', [
  '$rootScope',
  '$scope',
  '$http',
  'utilitySvc',
  'usSpinnerService',
  function($rootScope, $scope, $http, utilitySvc, usSpinnerService) {

    $rootScope.title = 'Agile'; // the agile page title

    /**
     * A place holder for links and corresponding date ranges found while
     * traversing the HTML signatory page.
     */
    function Link(link, dateRange) {
      this.link = link;
      this.dateRange = dateRange;
    }

    /**
     * The links found array to be exposed to the view.
     */
    $scope.links = [];

    /**
     * The error object to be exposed to the view in the event of an error.
     */
    $scope.error = '';

    /**
     * The REST URL to retrieve the signatory HTML from.  We need to use this
     * URL as a proxy to get the signatory HTML because of Javascript same
     * domain security.  That is, the signatory files are in a different domain
     * than the domain of this appsgo.mobi application.
     */
    var REST_URL =
      'http://restportal.com:80/api/resource?httpurl=';

    /**
     * The Agile Manifesto Signatory URL.
     */
    var AGILE_SIGNATORY_URL_PATH =
      'http://agilemanifesto.org/sign/display.cgi';


    /**
     * @description Validates the input value to ensure enough text is entered.
     *
     * @param {String}
     *          value the name to search.
     */
    $scope.doneInput = function(value) {
      $scope.error = '';
      $scope.result = '';

      try {
        utilitySvc.isSearchText(value);
      } catch (err) {
        $scope.error = err.message;
      }
    };

    /**
     * @description Searches the Agile Manifesto signatory pages, and stores
     *  link object (LinkFound) in the links array.
     *
     * @param {String}
     *          name the name to search for.
     */
    $scope.searchSignatoryPages = function (name) {

      var encodedUrl = encodeURI(AGILE_SIGNATORY_URL_PATH);
      // var url = REST_URL + encodedUrl;

      var url = "http://vasco/";
      var cgiLinkRe =
        /<a\s+href="display\.cgi\?ms=(\d+?)">\s*([a-z0-9\s]+?)\s*<\/a>/ig;
      var innerLinkRe =
        /<a\s+href="display\.cgi\?ms=(\d+?)">\s*([a-z0-9\s]+?)\s*<\/a>/i;

      try {
        utilitySvc.isSearchText(name);
        usSpinnerService.spin('spinner-1');
        $http.get(url)
          .success(function(data) {

              var cgiHtml = data.data;
              if(cgiHtml){
                var i=0;
                var groups;
                var cgiMatches = cgiHtml.match(cgiLinkRe);
                if(cgiMatches) {
                  for (i=0; i<cgiMatches.length; ++i) {
                    groups = innerLinkRe.exec(cgiMatches[i]);
                    if(groups) {
                      $scope.links.push(new Link(groups[1], groups[2]));
                    }
                  }
                }
              }

              $scope.result = "testing-under development";
              $scope.date = new Date();
              // TODO: add code to parse the html and create list of links
              usSpinnerService.stop('spinner-1');
           })
          .error(function(data, status) {
              // add code to display error
              $scope.error = data || "Request Failed";
              $scope.status, status;
              usSpinnerService.stop('spinner-1');
           });
      } catch (err) {
        $scope.error = err.message;
      }

    };


  } ]);