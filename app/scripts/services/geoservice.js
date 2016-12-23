'use strict';

/**
 * @ngdoc service
 * @name dashboardProjectApp.geoService
 * @description
 * # geoService
 * Service in the dashboardProjectApp.
 */
angular.module('dashboardProjectApp')
  .service('geoService', function ($http) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    this.getGeoData = function() {
      return $http({
        method: 'GET',
        url: 'api/companies.json'
      })
    }
  });
