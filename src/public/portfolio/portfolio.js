(() => {
  'use strict';

  angular.module('drakesCrowd')
  .controller('portfolioCtrl', [
    'Main',
    'Mathy',
    function(Main, Mathy) {
      const vm = this;

      vm.portfolio = [];
      vm.investment = null;

      vm.sortConditions = {
        username: null,
        marketprice: null,
        approved: null
      };

      vm.toPercent = Mathy.toPercent;

      vm.sortBy = (type) => {
        Mathy.sortBy(vm.portfolio, vm.sortConditions, type);
      };

      vm.getInvestments = () => {
        Main.fetchPortfolio()
        .then(investments => {vm.portfolio = investments});
      };

      vm.getInvestments();
    }]);

})();
