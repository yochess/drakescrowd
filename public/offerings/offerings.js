(() => {
  'use strict';

  angular.module('drakesCrowd')
  .controller('offeringsCtrl', [
    'Main',
    '$routeParams',
    '$location',
    'Auth',
    'Mathy',
    function(Main, $routeParams, $location, Auth, Mathy) {
      const vm = this;

      vm.id = +$routeParams.id;
      vm.offerings = [];
      vm.offering = null;
      vm.info = {};

      vm.toPercent = Mathy.toPercent;

      vm.isInvestor = () => Auth.getUserTypeSync() === 'investor';

      vm.submit = () => {
        vm.info.id = vm.id;
        Main.makeInvestment(vm.info)
          .then(investment => { $location.path('/portfolio') });
      };

      const displayOfferings = () => {
        Main.fetchOfferings()
          .then(offerings => {vm.offerings = offerings});
      };

      const displayOffering = () => {
        Main.fetchOffering(vm.id)
          .then(offering => {vm.offering = offering});
      };

      vm.id ? displayOffering() : displayOfferings();
    }]);

})();
