(() => {
  'use strict';

  angular.module('drakesCrowd')
  .controller('listingsCtrl', [
    'Main',
    '$routeParams',
    function(Main, $routeParams) {
      const vm = this;

      vm.listings = [];
      vm.listing = null;
      vm.id = +$routeParams.id;
      vm.info = {};

      const displayListings = () => {
        Main.fetchListings()
          .then(listings => {vm.listings = listings});
      };

      const displayListing = () => {
        Main.fetchListing(vm.id)
          .then(listing => {vm.listing = listing});
      }

      vm.id ? displayListing() : displayListings();

      // below needs work

      vm.sortConditions = {
        name: null,
        min: null
      };

      vm.toPercent = (num) => `${num * 100}%`;
      vm.sortBy = (type) => {

        vm.listings = vm.listings.sort((a, b) => {
          if (!vm.sortConditions[type]) {
            if (a[type] < b[type])
              return -1;
            if (a[type] > b[type])
              return 1;
            return 0;
          } else {
            if (b[type] < a[type])
              return -1;
            if (b[type] > a[type])
              return 1;
            return 0;
          }
        });
        vm.sortConditions[type] = !vm.sortConditions[type];

      };

      vm.submit = () => {
        Main.makeListing(vm.info)
          .then(data => {
            displayListings();
            vm.info = {};
          })
      };

      vm.process = (investment, accept) => {
        Main.editListing(vm.id, investment, accept)
          .then(res => {
            displayListing();
          });
      };

    }]);

})();
