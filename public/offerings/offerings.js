(() => {
  'use strict';

  angular.module('drakesCrowd')
  .controller('offeringsCtrl', [
    'Main',
    '$routeParams',
    function(Main, $routeParams) {
      const vm = this;

      vm.offerings = [];
      vm.offering = null;
      vm.id = +$routeParams.id;

      const displayOfferings = () => {
        Main.fetchOfferings()
          .then(offerings => {vm.offerings = offerings});
      };

      const displayOffering = () => {
        Main.fetchOffering(vm.id)
          .then(offering => {vm.offering = offering});
      };

      vm.toPercent = (num) => `${num * 100}%`;

      vm.id ? displayOffering() : displayOfferings();
    }]);

})();
