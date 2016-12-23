'use strict';

/**
 * @ngdoc overview
 * @name dashboardProjectApp
 * @description
 * # dashboardProjectApp
 *
 * Main module of the application.
 */
angular
  .module('dashboardProjectApp', [
    'ngAnimate',
    'ui.router'
  ])
  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

      $urlRouterProvider.otherwise('/keymetrics');

      $stateProvider
      .state('geo', {
        url: '/geo',
        templateUrl: 'views/geo.html',
        controller: 'GeoCtrl as geo'
      })
      .state('keymetrics', {
        url: '/keymetrics',
        templateUrl: 'views/key-metrics.html',
        controller: 'KeymetricsCtrl as keymetric'
      })
      .state('issues', {
        url: '/issues',
        templateUrl: 'views/issues.html',
        controller: 'IssuesCtrl as issues'
      });
  }]);
