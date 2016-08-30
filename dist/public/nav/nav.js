'use strict';

(function () {
  'use strict';

  var app = angular.module('drakesCrowd');

  app.controller('navCtrl', ['Auth', '$location', function (Auth, $location) {
    var vm = this;

    vm.noAuth = function () {
      return Auth.getUserTypeSync() === '';
    };

    vm.investorAuth = function () {
      return Auth.getUserTypeSync() === 'investor';
    };

    vm.companyAuth = function () {
      return Auth.getUserTypeSync() === 'company';
    };

    vm.logout = function () {
      Auth.logout().then(function () {
        $location.path('/home');
      });
    };
  }]);
})();