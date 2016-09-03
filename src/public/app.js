(() => {
  'use strict';

  const app = angular.module('drakesCrowd', ['ui.router', 'ngFileUpload'])

  app.config([
    '$stateProvider',
    '$urlRouterProvider',
    '$locationProvider',
    function($stateProvider, $urlRouterProvider, $locationProvider) {
      $urlRouterProvider.otherwise('home');

      $stateProvider
        .state('root', {
          'abstract': true,
          resolve: {
            authorize: ['Auth', function(Auth) {
              return Auth.getUserTypeAsync();
            }]
          },
          template: '<div ui-view/></div>'
        })
        .state('home', {
          parent: 'root',
          url: '/home',
          templateUrl: './home/home.html'
        })
        .state('signup', {
          parent: 'root',
          url: '/signup',
          templateUrl: './auth/investor-signup.html',
          controller: 'authCtrl',
          controllerAs: 'vm'
        })
        .state('login', {
          parent: 'root',
          url: '/login',
          templateUrl: './auth/investor-login.html',
          controller: 'authCtrl',
          controllerAs: 'vm'
        })
        .state('companySignup', {
          parent: 'root',
          url: '/company/signup',
          templateUrl: './auth/company-signup.html',
          controller: 'authCtrl',
          controllerAs: 'vm'
        })
        .state('companyLogin', {
          parent: 'root',
          url: '/company/login',
          templateUrl: './auth/company-login.html',
          controller: 'authCtrl',
          controllerAs: 'vm'
        })
        .state('offerings', {
          parent: 'root',
          url: '/offerings',
          templateUrl: './offerings/offerings.html',
          controller: 'offeringsCtrl',
          controllerAs: 'vm'
        })
        .state('offering', {
          parent: 'root',
          url: '/offerings/:id',
          templateUrl: './offerings/offering.html',
          controller: 'offeringsCtrl',
          controllerAs: 'vm'
        })
        .state('listings', {
          parent: 'root',
          url: '/listfolder', // renamed due to weird browser settings
          templateUrl: './listings/listings.html',
          controller: 'listingsCtrl',
          controllerAs: 'vm',
          data: { role: 'company' }
        })
        .state('listing', {
          parent: 'root',
          url: '/listings/:id',
          templateUrl: './listings/listing.html',
          controller: 'listingsCtrl',
          controllerAs: 'vm',
          data: { role: 'company' }
        })
        .state('portfolio', {
          parent: 'root',
          url: '/portfolder', // renamed due to weird browser settings
          templateUrl: './portfolio/portfolio.html',
          controller: 'portfolioCtrl',
          controllerAs: 'vm',
          data: { role: 'investor' }
        });

      $locationProvider.html5Mode(true);
  }])

  // http://stackoverflow.com/questions/33016355/angular-route-async-authorization
  app.run([
    '$rootScope',
    '$state',
    'Auth',
    '$window',
    function ($rootScope, $state, Auth, $window) {
      const userInfo = {
        refreshed: true,
        storage: $window.sessionStorage['userType']
      };

      $rootScope.$on('$stateChangeStart', function (event, next) {

        if (userInfo.refreshed) {
          userInfo.refreshed = !userInfo.refreshed;
        } else {
          $window.sessionStorage['userType'] = Auth.getUserTypeSync();
        }

        if (next.data) {
          let authType = next.data.role;
          if (Auth.getUserTypeSync() !== authType && userInfo.storage !== authType) {
            event.preventDefault();
            $state.go('home');
          }
        }
      });

    }
  ]);

})();
