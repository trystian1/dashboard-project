'use strict';

/**
 * @ngdoc function
 * @name dashboardProjectApp.controller:KeymetricsCtrl
 * @description
 * # KeymetricsCtrl
 * Controller of the dashboardProjectApp
 */
angular.module('dashboardProjectApp')
  .controller('KeymetricsCtrl', ['metricsService', '$interval', function (metricsService, $interval) {

      var _this = this;

      this.q1TotalSales = 0;
      this.q2TotalSales = 0;
      this.q3TotalSales = 0;
      this.q4TotalSales = 0;
      this.issuesQ1Length = 0;
      this.issuesQ2Length = 0;
      this.issuesQ3Length = 0;
      this.issuesQ4Length = 0;

      metricsService.getQuaterSales()
        .then(function successCallback(response) {
          _this.yearData = metricsService.parseData(response.data, 'registered');
          _this.parseDataIntoQuarters(_this.yearData);
        }, function errorCallback(response) {

        });

      metricsService.getIssues()
        .then(function successCallback(response) {
          _this.issues = metricsService.convertCSV(response.data);
          _this.randomIssue = metricsService.getRandomIssue(_this.issues);
          _this.startIssueInterval(_this.issues);
          _this.issueYearData = metricsService.parseData(_this.issues, 'opened');
          _this.parseIssuesIntoGraph(_this.issueYearData);
        }, function errorCallback(response) {

        });

      this.salesInterval = $interval(function() {
        var latestSale = metricsService.getLatestSale(),
            data = metricsService.parseData(latestSale, 'registered');

        _this.recentSale = latestSale[0]
        _this.yearData.Q4.push(latestSale[0]);

        _this.parseDataIntoQuarters(_this.yearData);

      }, 1000);

      this.startIssueInterval = function(issues) {
        $interval(function() {
          _this.randomIssue = metricsService.getRandomIssue(issues);
          _this.issuesQ4Length += 1;
        }, 4000);
      }

      this.parseDataIntoQuarters = function(data) {

        this.q1TotalSales = metricsService.getTotalQuarterResult(data.Q1);
        this.q2TotalSales = metricsService.getTotalQuarterResult(data.Q2);
        this.q3TotalSales = metricsService.getTotalQuarterResult(data.Q3);
        this.q4TotalSales = metricsService.getTotalQuarterResult(data.Q4);
        this.progress = (this.q4TotalSales / 1000000) * 100;

        if (this.progress > 100) {
          $interval.cancel(this.salesInterval);
        }
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
