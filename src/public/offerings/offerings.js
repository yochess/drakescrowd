(() => {
  'use strict';

  angular.module('drakesCrowd')
  .controller('offeringsCtrl', [
    'Main',
    '$stateParams',
    '$state',
    'Auth',
    'Mathy',
    function(Main, $stateParams, $state, Auth, Mathy) {
      const vm = this;

      vm.id = +$stateParams.id;
      vm.offerings = [];
      vm.offering = null;
      vm.info = {};

      vm.toPercent = Mathy.toPercent;

      vm.isInvestor = () => Auth.getUserTypeSync() === 'investor';

      vm.submit = () => {
        vm.info.id = vm.id;
        Main.makeInvestment(vm.info)
          .then(investment => { $state.go('portfolio') });
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
