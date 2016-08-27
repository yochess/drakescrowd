(() => {
  'use strict';

  const app = angular.module('drakesCrowd', ['ui.router'])

  app.config([
    '$stateProvider',
    '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
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
          controllerAs: 'vm',
          resolve: {
            security: ['$q', 'Auth', function($q, Auth) {
              if (Auth.getUserTypeSync() !== 'company'){
                return $q.reject("Not Company");
              }
            }]
          }
        })
        .state('listingDetail', {
          url: '/listings/:id',
          templateUrl: './listings/listing.html',
          controller: 'listingsCtrl',
          controllerAs: 'vm',
          resolve: {
            security: ['$q', 'Auth', function($q, Auth) {
              if (Auth.getUserTypeSync() !== 'company'){
                return $q.reject("Not Company");
              }
            }]
          }
        })
        .state('portfolio', {
          url: '/portfolio',
          templateUrl: './portfolio/portfolio.html',
          controller: 'portfolioCtrl',
          controllerAs: 'vm',
          resolve: {
            security: ['$q', 'Auth', function($q, Auth) {
              if (Auth.getUserTypeSync() !== 'investor'){
                return $q.reject("Not Investor");
              }
            }]
          }
        });
  }])

  // this is super hacky (got into a huge rabbit hole b/c of ui-router)
  app.run(['$rootScope', '$state', 'Auth', function($rootScope, $state, Auth) {
    $rootScope.$on('$stateChangeStart',
      function(event, toState, toParams, fromState, fromParams, options){
        Auth.getUserTypeAsync().then(() => {
          $rootScope.$on('$stateChangeError', function(e, toState, toParams, fromState, fromParams, error) {
            $state.go('home');
          });
        });

    })


  }]);


})();
