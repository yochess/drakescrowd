(() => {
  'use strict';

  angular.module('drakesCrowd')
  .controller('listingsCtrl', [
    'Main',
    '$routeParams',
    'Mathy',
    function(Main, $routeParams, Mathy) {
      const vm = this;

      vm.listings = [];
      vm.listing = null;
      vm.id = +$routeParams.id;
      vm.info = {};

      vm.toPercent = Mathy.toPercent;

      vm.submit = () => {
        Main.makeListing(vm.info)
          .then(data => {
            displayListings();
            vm.info = {};
          })
      };

      vm.editListing = (available, shares, min) => {
        Main.editListing(vm.id, available, shares, min)
          .then(res => {
            delete vm.min;
            delete vm.shares;
            delete vm.available;
            displayListing()
          });
      };

      vm.acceptInvestment = (investment, accept) => {
        Main.acceptInvestment(vm.id, investment, accept)
        .then(res => {displayListing()});
      };

      vm.sortConditions = {
        name: null,
        min: null
      };

      vm.sortBy = (type) => {
        Mathy.sortBy(vm.listings, vm.sortConditions, type);
      };

      const displayListings = () => {
        Main.fetchListings()
          .then(listings => {vm.listings = listings});
      };

      const displayListing = () => {
        Main.fetchListing(vm.id)
          .then(listing => {vm.listing = listing});
      }

      vm.id ? displayListing() : displayListings();
    }]);

})();
