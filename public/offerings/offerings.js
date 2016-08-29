(() => {
  'use strict';

  angular.module('drakesCrowd')
  .controller('offeringsCtrl', [
    'Main',
    '$routeParams',
    function(Main, $routeParams) {
      const vm = this;

      vm.id = +$routeParams.id;
      vm.offerings = [];
      vm.offering = null;
      vm.info = {};

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

      vm.submit = () => {

      };

    }]);

})();
