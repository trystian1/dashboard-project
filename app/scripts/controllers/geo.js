'use strict';

/**
 * @ngdoc function
 * @name dashboardProjectApp.controller:GeoCtrl
 * @description
 * # GeoCtrl
 * Controller of the dashboardProjectApp
 */
angular.module('dashboardProjectApp')
  .controller('GeoCtrl', ['geoService', function (geoService) {
    var _this = this;
    geoService.getGeoData().then(function successCallback(response) {
      _this.countries = response.data;
    }, function errorCallback(response) {

    });

    this.onClickCountry = function(event) {
      _this.countryName = event.currentTarget.attributes.title.value;
      this.selectedCountry = _this.countries.find(function(item) {return item.country === _this.countryName});
    }

  }]);
