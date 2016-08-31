(() => {
  'use strict';

  angular.module('drakesCrowd')
  .controller('listingsCtrl', [
    'Main',
    '$routeParams',
    'Mathy',
    'Upload',
    '$timeout',
    function(Main, $routeParams, Mathy, Upload, $timeout) {
      const vm = this;

      vm.listings = [];
      vm.listing = null;
      vm.id = +$routeParams.id;
      vm.info = {};

      vm.toPercent = Mathy.toPercent;

      // vm.submit = () => {
      //   Main.makeListing(vm.info)
      //     .then(data => {
      //       displayListings();
      //       vm.info = {};
      //     })
      // };

      vm.submit = function(file) {
          file.upload = Upload.upload({
            url: '/upload',
            data: {file: file},
          });

          file.upload.then(
            (response) => {
              $timeout(() => {
                vm.info.img = response.data.path;
                Main.makeListing(vm.info).then(data => {
                  displayListings();
                  vm.info = {};
                });
              });
            },
            (response) => {
              if (response.status > 0) {
                vm.errorMsg = response.status + ': ' + response.data;
              }
            },
            (evt) => {
            // Math.min is to fix IE which reports 200% sometimes
              file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
            });
          }



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
