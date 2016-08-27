(() => {
  'use strict';

  angular.module('drakesCrowd', ['ui.router'])
  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('signup', {
        url: '/signup',
        templateUrl: './auth/investor-signup.html',
        controller: 'authCtrl',
        controllerAs: 'vm'
      })
      .state('login', {
        url: '/login',
        templateUrl: './auth/investor-login.html',
        controller: 'authCtrl',
        controllerAs: 'vm'
      })
      .state('company-signup', {
        url: '/company/signup',
        templateUrl: './auth/company-signup.html',
        controller: 'authCtrl',
        controllerAs: 'vm'
      })
      .state('company-login', {
        url: '/company/login',
        templateUrl: './auth/company-login.html',
        controller: 'authCtrl',
        controllerAs: 'vm'
      })
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
      .state('listingDetail', {
        url: '/listings/:id',
        templateUrl: './listings/listing.html',
        controller: 'listingsCtrl',
        controllerAs: 'vm'
      })
      .state('portfolio', {
        url: '/portfolio',
        templateUrl: './portfolio/portfolio.html',
        controller: 'portfolioCtrl',
        controllerAs: 'vm'
      })
  })
})();
