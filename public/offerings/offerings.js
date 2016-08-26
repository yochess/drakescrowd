(() => {
  'use strict';

  angular.module('drakesCrowd')
  .controller('offeringsCtrl', ['$stateParams', function($stateParams) {
    const vm = this;

    vm.id = +$stateParams.id;

    vm.offerings = [
      {
        id: 1,
        name: 'Huge Apartment',
        company: 'Company ABC',
        img: 'http://www.techinsights.com/uploadedImages/Public_Website/Content_-_Primary/Teardowncom/Sample_Reports/sample-icon.png',
        type: 'property',
        min: 100000,
        hold: 3,
        target: {
          irr: 0.3,
          cash: 0.2
        },
        details: 'Additional Details for id: 1'
      },
      {
        id: 2,
        name: 'Medium Apartment',
        company: 'Company ABC',
        img: 'http://www.techinsights.com/uploadedImages/Public_Website/Content_-_Primary/Teardowncom/Sample_Reports/sample-icon.png',
        type: 'property',
        min: 50000,
        hold: 3,
        target: {
          irr: 0.24,
          cash: 0.16
        },
        details: 'Additional Details for id: 2'
      },
      {
        id: 3,
        name: 'Small Apartment',
        company: 'Company XYZ',
        img: 'http://www.techinsights.com/uploadedImages/Public_Website/Content_-_Primary/Teardowncom/Sample_Reports/sample-icon.png',
        type: 'property',
        min: 25000,
        hold: 3,
        target: {
          irr: 0.2,
          cash: 0.1
        },
        details: 'Additional Details for id: 3'
      }
    ];

    vm.toPercent = (num) => `${num * 100}%`;

  }]);
})();
