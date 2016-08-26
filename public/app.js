'use strict';
(() => {
  angular.module('drakesCrowd', ['ui.router'])
  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: './main/home.html',
        controller: 'mainCtrl',
        controllerAs: 'vm'
      })
  })
})();
