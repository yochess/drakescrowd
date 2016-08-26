(() => {
  'use strict';

  angular.module('drakesCrowd')
  .controller('offeringsCtrl', [
    'Main',
    '$stateParams',
    function(Main, $stateParams) {

      const vm = this;

      vm.id = +$stateParams.id;

      vm.offerings = Main.offerings;

      vm.toPercent = (num) => `${num * 100}%`;

    }]);

})();
