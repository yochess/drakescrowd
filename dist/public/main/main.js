'use strict';

(function () {
  'use strict';

  var app = angular.module('drakesCrowd');

  app.factory('Main', ['$http', function ($http) {

    var fetchOfferings = function fetchOfferings() {
      return $http.get('/api/offerings').then(function (res) {
        return res.data;
      });
    };

    var fetchOffering = function fetchOffering(id) {
      return $http.get('/api/offerings/' + id).then(function (res) {
        return res.data;
      });
    };

    var makeInvestment = function makeInvestment(data) {
      return $http.post('/api/investments', data).then(function (res) {
        return res.data;
      });
    };

    var fetchPortfolio = function fetchPortfolio() {
      return $http.get('/api/investments').then(function (res) {
        return res.data;
      });
    };

    var fetchListings = function fetchListings() {
      return $http.get('/api/listings').then(function (res) {
        return res.data;
      });
    };

    var fetchListing = function fetchListing(id) {
      return $http.get('/api/listings/' + id).then(function (res) {
        return res.data;
      });
    };

    var makeListing = function makeListing(data) {
      return $http.post('/api/listings', data).then(function (res) {
        return res.data;
      });
    };

    var editListing = function editListing(id, available, shares, min) {
      return $http.put('/api/listings/' + id, {
        available: available,
        shares: shares,
        min: min
      }).then(function (res) {
        return res.data;
      });
    };

    var acceptInvestment = function acceptInvestment(id, investment, accept) {
      return $http.put('/api/investments/accept', {
        investment: investment,
        accept: accept
      }).then(function (res) {
        return res.data;
      });
    };

    return {
      fetchOfferings: fetchOfferings,
      fetchOffering: fetchOffering,
      makeInvestment: makeInvestment,
      fetchPortfolio: fetchPortfolio,
      fetchListings: fetchListings,
      fetchListing: fetchListing,
      makeListing: makeListing,
      editListing: editListing,
      acceptInvestment: acceptInvestment
    };
  }]);
})();