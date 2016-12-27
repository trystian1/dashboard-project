'use strict';

/**
 * @ngdoc function
 * @name dashboardProjectApp.controller:IssuesCtrl
 * @description
 * # IssuesCtrl
 * Controller of the dashboardProjectApp
 */
angular.module('dashboardProjectApp')
  .controller('IssuesCtrl', ['metricsService', '$scope', function (metricsService, $scope) {
    var _this = this;

    this.orderProp = 'opened';
    metricsService.pollIssues();

    $scope.$on('issues-data:fetched', function(event, data) {
      _this.totalIssues = metricsService.convertCSV(data.response);
      _this.loadedItems = 101;
      _this.issues = _this.totalIssues.slice(1, 101);
    });

    $scope.$on('$destroy', function iVeBeenDismissed() {
      metricsService.cancelRequests();
    });

    this.sortBy = function(prop) {
      this.orderProp = prop;
    }
  }]);
