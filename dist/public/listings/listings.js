'use strict';

(function () {
  'use strict';

  angular.module('drakesCrowd').controller('listingsCtrl', ['Main', '$routeParams', 'Mathy', function (Main, $routeParams, Mathy) {
    var vm = this;

    vm.listings = [];
    vm.listing = null;
    vm.id = +$routeParams.id;
    vm.info = {};

    vm.toPercent = Mathy.toPercent;

    vm.submit = function () {
      Main.makeListing(vm.info).then(function (data) {
        displayListings();
        vm.info = {};
      });
    };

    vm.editListing = function (available, shares, min) {
      Main.editListing(vm.id, available, shares, min).then(function (res) {
        delete vm.min;
        delete vm.shares;
        delete vm.available;
        displayListing();
      });
    };

    vm.acceptInvestment = function (investment, accept) {
      Main.acceptInvestment(vm.id, investment, accept).then(function (res) {
        displayListing();
      });
    };

    vm.sortConditions = {
      name: null,
      min: null
    };

    vm.sortBy = function (type) {
      Mathy.sortBy(vm.listings, vm.sortConditions, type);
    };

    var displayListings = function displayListings() {
      Main.fetchListings().then(function (listings) {
        vm.listings = listings;
      });
    };

    var displayListing = function displayListing() {
      Main.fetchListing(vm.id).then(function (listing) {
        vm.listing = listing;
      });
    };

    vm.id ? displayListing() : displayListings();
  }]);
})();