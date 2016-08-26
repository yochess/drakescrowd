(() => {
  'use strict';

  angular.module('drakesCrowd', ['ui.router'])
  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: './main/home.html',
        controller: 'mainCtrl',
        controllerAs: 'vm'
      })
      .state('offerings', {
        url: '/offerings',
        templateUrl: './offerings/offerings.html',
        controller: 'offeringsCtrl',
        controllerAs: 'vm'
      })
      .state('offeringDetail', {
        url: '/offerings/:id',
        templateUrl: './offerings/offering.html',
        controller: 'offeringsCtrl',
        controllerAs: 'vm'
      })
      .state('listings', {
        url: '/listings',
        templateUrl: './listings/listings.html',
        controller: 'listingsCtrl',
        controllerAs: 'vm'
      })
  })
})();
