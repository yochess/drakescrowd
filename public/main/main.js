(() => {
  'use strict';

  const app = angular.module('drakesCrowd')

  app.controller('mainCtrl', ['$scope', function($scope) {
    const vm = this;

  }]);

  app.factory('Main', ['$http', function($http) {

    const fetchOfferings = () => {
      return $http
        .get('/api/offerings')
        .then(res => res.data);
    };

    const fetchOffering = (id) => {
      return $http
        .get(`/api/offerings/${id}`)
        .then(res => res.data);
    };

    const fetchListings = () => {
      return $http
        .get('/api/listings')
        .then(res => res.data);
    };

    const fetchListing = (id) => {
      return $http
        .get(`/api/listings/${id}`)
        .then(res => res.data);
    }

    return {
      fetchOfferings,
      fetchOffering,
      fetchListings,
      fetchListing
    }

  }]);

})();
