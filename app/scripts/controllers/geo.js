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

    this.showOnMap = function(country) {

      var position = {
        lat: country.lat,
        lng: country.lng
      }

      var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 4,
          center: position
      });

      var marker = new google.maps.Marker({
        position: position,
        map: map
      });

      map.panTo(position);

    }

  }]);
