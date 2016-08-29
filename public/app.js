(() => {
  'use strict';

  const app = angular.module('drakesCrowd', ['ngRoute'])

  app.config([
    '$routeProvider',
    function($routeProvider) {
      $routeProvider
        .when('/signup', {
          templateUrl: './auth/investor-signup.html',
          controller: 'authCtrl',
          controllerAs: 'vm',
          access: {restricted: () => false}
        })
        .when('/login', {
          templateUrl: './auth/investor-login.html',
          controller: 'authCtrl',
          controllerAs: 'vm',
          access: {restricted: () => false}
        })
        .when('/company/signup', {
          templateUrl: './auth/company-signup.html',
          controller: 'authCtrl',
          controllerAs: 'vm',
          access: {restricted: () => false}
        })
        .when('/company/login', {
          templateUrl: './auth/company-login.html',
          controller: 'authCtrl',
          controllerAs: 'vm',
          access: {restricted: () => false}
        })
        .when('/home', {
          templateUrl: './home/home.html',
          controller: 'mainCtrl',
          controllerAs: 'vm',
          access: {restricted: () => false}
        })
        .when('/offerings', {
          templateUrl: './offerings/offerings.html',
          controller: 'offeringsCtrl',
          controllerAs: 'vm',
          access: {restricted: () => false}
        })
        .when('/offerings/:id', {
          templateUrl: './offerings/offering.html',
          controller: 'offeringsCtrl',
          controllerAs: 'vm',
          access: {
            restricted: (Auth) => Auth.getUserTypeSync() !== 'investor'}
        })
        .when('/listings', {
          url: '/listings',
          templateUrl: './listings/listings.html',
          controller: 'listingsCtrl',
          controllerAs: 'vm',
          access: {restricted: (Auth) => Auth.getUserTypeSync() !== 'company'}
        })
        .when('/listings/:id', {
          templateUrl: './listings/listing.html',
          controller: 'listingsCtrl',
          controllerAs: 'vm',
          access: {restricted: (Auth) => Auth.getUserTypeSync() !== 'company'}
        })
        .when('/portfolio', {
          templateUrl: './portfolio/portfolio.html',
          controller: 'portfolioCtrl',
          controllerAs: 'vm',
          access: {restricted: (Auth) => Auth.getUserTypeSync() !== 'investor'}
        });
  }])

  // this is super hacky (got into a huge rabbit hole b/c of ui-router)
  // app.run(['$rootScope', '$state', 'Auth', function($rootScope, $state, Auth) {
  //   $rootScope.$on('$stateChangeStart',
  //     function(event, toState, toParams, fromState, fromParams, options){
  //       Auth.getUserTypeAsync().then(() => {
  //         $rootScope.$on('$stateChangeError', function(e, toState, toParams, fromState, fromParams, error) {
  //           $state.go('home');
  //         });
  //       });

  //   })

  app.run([
    '$rootScope',
    '$location',
    '$route',
    'Auth',
    function ($rootScope, $location, $route, Auth) {
    $rootScope.$on('$routeChangeStart', (event, next, current) => {
      Auth.getUserTypeAsync().then(() => {
        if (next.access.restricted(Auth)) {
          $location.path('/home');
          $route.reload();
        }
      });
    });
  }]);


  // }]);


})();
