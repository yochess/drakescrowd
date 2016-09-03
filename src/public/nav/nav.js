(() => {
  'use strict';
  const app = angular.module('drakesCrowd')

  app.controller('navCtrl', [
    'Auth',
    '$state',
    '$window',
      function(Auth, $state, $window) {
      const vm = this;

      vm.noAuth = () => {
        return Auth.getUserTypeSync() === '';
      };

      vm.investorAuth = () => {
        return Auth.getUserTypeSync() === 'investor';
      };

      vm.companyAuth = () => {
        return Auth.getUserTypeSync() === 'company';
      };

      vm.logout = () => {
        Auth.logout().then(() => {
          $window.sessionStorage['userType'] = '';
          $state.go('home');
        });
      };
    }
  ]);

  app.directive('drakebar', [function() {
    return {
      templateUrl: './nav/nav.html',
      controller: 'navCtrl',
      controllerAs: 'vm'
    }
  }]);

})();
