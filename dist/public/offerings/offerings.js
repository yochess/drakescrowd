'use strict';

(function () {
  'use strict';

  angular.module('drakesCrowd').controller('offeringsCtrl', ['Main', '$routeParams', '$location', 'Auth', 'Mathy', function (Main, $routeParams, $location, Auth, Mathy) {
    var vm = this;

    vm.id = +$routeParams.id;
    vm.offerings = [];
    vm.offering = null;
    vm.info = {};

    vm.toPercent = Mathy.toPercent;

    vm.isInvestor = function () {
      return Auth.getUserTypeSync() === 'investor';
    };

    vm.submit = function () {
      vm.info.id = vm.id;
      Main.makeInvestment(vm.info).then(function (investment) {
        $location.path('/portfolio');
      });
    };

    var displayOfferings = function displayOfferings() {
      Main.fetchOfferings().then(function (offerings) {
        vm.offerings = offerings;
      });
    };

    var displayOffering = function displayOffering() {
      Main.fetchOffering(vm.id).then(function (offering) {
        vm.offering = offering;
      });
    };

    vm.id ? displayOffering() : displayOfferings();
  }]);
})();