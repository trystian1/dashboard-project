'use strict';

/**
 * @ngdoc function
 * @name dashboardProjectApp.controller:KeymetricsCtrl
 * @description
 * # KeymetricsCtrl
 * Controller of the dashboardProjectApp
 */
angular.module('dashboardProjectApp')
  .controller('KeymetricsCtrl', ['metricsService', '$interval', '$scope', function (metricsService, $interval, $scope) {

      var _this = this;
      this.q1TotalSales = 0;
      this.q2TotalSales = 0;
      this.q3TotalSales = 0;
      this.q4TotalSales = 0;
      this.issuesQ1Length = 0;
      this.issuesQ2Length = 0;
      this.issuesQ3Length = 0;
      this.issuesQ4Length = 0;

      metricsService.pollQuarterSales();
      metricsService.pollIssues();

      $scope.$on('$destroy', function iVeBeenDismissed() {
        metricsService.cancelRequests();
      });

      $scope.$on('sales-data:fetched', function(event, data){
        _this.yearData = metricsService.parseData(data.response, 'registered');
        _this.parseDataIntoQuarters(_this.yearData);
        _this.recentSale = data.response[data.response.length - 1];
      });

      $scope.$on('issues-data:fetched', function(event, data){
          _this.issues = metricsService.convertCSV(data.response);
          _this.randomIssue = metricsService.getRandomIssue(_this.issues);
          _this.issueYearData = metricsService.parseData(_this.issues, 'opened');
          _this.parseIssuesIntoGraph(_this.issueYearData);
      });

      this.parseDataIntoQuarters = function(data) {

        this.q1TotalSales = metricsService.getTotalQuarterResult(data.Q1);
        this.q2TotalSales = metricsService.getTotalQuarterResult(data.Q2);
        this.q3TotalSales = metricsService.getTotalQuarterResult(data.Q3);
        this.q4TotalSales = metricsService.getTotalQuarterResult(data.Q4);
        this.progress = (this.q4TotalSales / 1000000) * 100;

        this.q1Position = metricsService.getPositionOnGraph(this.q1TotalSales)
        this.q2Position = metricsService.getPositionOnGraph(this.q2TotalSales)
        this.q3Position = metricsService.getPositionOnGraph(this.q3TotalSales)
        this.q4Position = metricsService.getPositionOnGraph(this.q4TotalSales)

      }

      this.parseIssuesIntoGraph = function(issues) {
        this.issuesQ1Length = issues.Q1.length;
        this.issuesQ2Length = issues.Q2.length;
        this.issuesQ3Length = issues.Q3.length;
        this.issuesQ4Length = issues.Q4.length;
      }
  }]);
