'use strict';

/**
 * @ngdoc function
 * @name dashboardProjectApp.controller:IssuesCtrl
 * @description
 * # IssuesCtrl
 * Controller of the dashboardProjectApp
 */
angular.module('dashboardProjectApp')
  .controller('IssuesCtrl', ['metricsService', function (metricsService) {
    this.orderProp = 'opened';

    var _this = this;
      metricsService.getIssues()
        .then(function successCallback(response) {

          _this.totalIssues = metricsService.convertCSV(response.data);
          _this.loadedItems = 101;
          _this.issues = _this.totalIssues.slice(1, 101);
          console.log(_this.issues)
        }, function errorCallback(response) {

        });

    this.sortBy = function(prop) {
      console.log(prop)
      this.orderProp = prop;
    }
  }]);
