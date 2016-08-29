(() => {
  'use strict';
  const app = angular.module('drakesCrowd')

  app.controller('mainCtrl', ['Auth', function(Auth) {
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

    const makeInvestment = (data) => {
      return $http
        .post('/api/investments', data)
        .then(res => res.data);
    };

    const fetchPortfolio = () => {
      return $http
        .get('/api/investments')
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
    };

    const makeListing = (data) => {
      return $http
        .post('/api/listings', data)
        .then(res => res.data);
    };

    const editListing = (id, investment, accept) => {
      return $http
        .put(`/api/listings/${id}`, {
          investment: investment,
          accept:accept
        })
        .then(res => res.data);
    };

    return {
      fetchOfferings,
      fetchOffering,
      makeInvestment,
      fetchPortfolio,
      fetchListings,
      fetchListing,
      makeListing,
      editListing
    };

  }]);

})();
