(() => {
  'use strict';

  angular.module('drakesCrowd')
  .controller('portfolioCtrl', [
    'Main',
    function(Main) {
      const vm = this;

      vm.offerings = Main.offerings;

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


    }]);

})();
