'use strict';

/**
 * @ngdoc service
 * @name dashboardProjectApp.metricsService
 * @description
 * # metricsService
 * Service in the dashboardProjectApp.
 */
angular.module('dashboardProjectApp')
  .service('metricsService', function ($http, $timeout, $rootScope) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var _this = this;
    this.getQuaterSales = function() {
      return $http({
        method: 'GET',
        url: 'api/sales.json'
      });
    }

    this.pollQuarterSales = function() {

      var _this = this,
          data = { response: {}, calls: 0 };

      var poller = function() {
        $http.get('api/sales.json').then(function(r) {
          data.response = r.data;
          data.calls++;
          _this.salesTimeout = $timeout(poller, 1000);
          $rootScope.$broadcast('sales-data:fetched', data);
        });
      };
      poller();
    }

    this.pollIssues = function() {
      var _this = this,
          data = { response: {}, calls: 0 };

      var poller = function() {
        $http.get('api/MOCK_DATA.csv').then(function(r) {
          data.response = r.data;
          data.calls++;
          _this.issuesTimeout =  $timeout(poller, 2000);
          $rootScope.$broadcast('issues-data:fetched', data);
        });
      };
      poller();
    }

    this.cancelRequests = function() {
      $timeout.cancel(this.salesTimeout)
      $timeout.cancel(this.issuesTimeout)
    }

    this.convertCSV = function(csv) {
        var lines = csv.split("\n");
        var array = [];

        lines.forEach(function(line) {
          var lineInfo = line.split(',');
          var object = {
            id: lineInfo[0],
            firstName: lineInfo[1],
            lastName: lineInfo[2],
            email: lineInfo[3],
            issue: lineInfo[5] && lineInfo[5].length > 40 ? lineInfo[5].substring(0, 40) : lineInfo[5],
            opened: lineInfo[6],
            closed: lineInfo[7],
            status: lineInfo[8]
          }
          array.push(object);
        });

        return array;

    }

    this.getRandomIssue = function(issues) {
      return issues[Math.floor(Math.random() * issues.length) + 1]
    }

    this.getLatestSale = function() {
      var sale = Math.floor(Math.random() * 4000) + 1;
      return [{
        sales: sale.toString(),
        registered: new Date()
      }]
    }

    this.parseData = function(data, dateValue) {
      var yearData = {
        Q1: [],
        Q2: [],
        Q3: [],
        Q4: []
      }

     data.forEach(function (value) {

        var month = new Date(value[dateValue]).getMonth();

        switch(month) {
          case 0:
          case 1:
          case 2:
            yearData.Q1.push(value);
            break;
          case 3:
          case 4:
          case 5:
            yearData.Q2.push(value);
            break;
          case 6:
          case 7:
          case 8:
            yearData.Q3.push(value);
            break;
          case 9:
          case 10:
          case 11:
            yearData.Q4.push(value);
            break;
        }

      });

     return yearData;
    }

    this.getTotalQuarterResult = function(data) {

      var totalResult = 0;

      data.forEach(function (data) {
        var salesData = data.sales.replace(',', '');
        totalResult += parseFloat(salesData.replace('$', ''), 10);
      });

      return totalResult.toFixed(2);

    }

    this.getPositionOnGraph = function(totalResult) {
      var precentage = ((totalResult / 1000000)).toFixed(2);
      return 373 - (precentage * 373).toFixed(0);
    }



  });
