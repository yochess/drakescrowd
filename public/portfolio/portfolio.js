(() => {
  'use strict';

  angular.module('drakesCrowd')
  .controller('portfolioCtrl', [
    'Main',
    '$routeParams',
    function(Main, $routeParams) {
      const vm = this;

      vm.portfolio = [];
      vm.investment = null;
      vm.id = +$routeParams.id;

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

      vm.getInvestments = () => {
        Main.fetchPortfolio()
        .then(investments => {vm.portfolio = investments});
      };

      vm.getInvestments();
    }]);

})();
