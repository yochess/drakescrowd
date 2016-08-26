(() => {
  'use strict';

  angular.module('drakesCrowd')
  .controller('listingsCtrl', ['$scope', function($scope) {
    const vm = this;

    vm.offerings = [
      {
        name: 'Huge Apartment',
        company: 'Company ABC',
        img: 'http://www.techinsights.com/uploadedImages/Public_Website/Content_-_Primary/Teardowncom/Sample_Reports/sample-icon.png',
        type: 'property',
        min: 100000,
        hold: 3,
        target: {
          irr: 0.3,
          cash: 0.2
        }
      },
      {
        name: 'Medium Apartment',
        company: 'Company ABC',
        img: 'http://www.techinsights.com/uploadedImages/Public_Website/Content_-_Primary/Teardowncom/Sample_Reports/sample-icon.png',
        type: 'property',
        min: 50000,
        hold: 3,
        target: {
          irr: 0.24,
          cash: 0.16
        }
      },
      {
        name: 'Small Apartment',
        company: 'Company XYZ',
        img: 'http://www.techinsights.com/uploadedImages/Public_Website/Content_-_Primary/Teardowncom/Sample_Reports/sample-icon.png',
        type: 'property',
        min: 25000,
        hold: 3,
        target: {
          irr: 0.2,
          cash: 0.1
        }
      }
    ];

    vm.info = {};

    vm.sortConditions = {
      name: null,
      min: null
    };

    vm.toPercent = (num) => `${num * 100}%`;
    vm.sortBy = (type) => {

      vm.offerings = vm.offerings.sort((a, b) => {
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
      console.log(vm.info);
    };

  }]);
})();
