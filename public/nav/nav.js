(() => {
  'use strict';
  const app = angular.module('drakesCrowd')

  app.controller('navCtrl', ['Auth', '$state', function(Auth, $state) {
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
        $state.go('home');
      });
    };
  }]);

})();
