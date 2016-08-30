'use strict';

(function () {
  'use strict';

  var app = angular.module('drakesCrowd', ['ngRoute']);

  app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $routeProvider.when('/home', {
      templateUrl: './home/home.html',
      access: { restricted: function restricted() {
          return false;
        } }
    }).when('/signup', {
      templateUrl: './auth/investor-signup.html',
      controller: 'authCtrl',
      controllerAs: 'vm',
      access: { restricted: function restricted() {
          return false;
        } }
    }).when('/login', {
      templateUrl: './auth/investor-login.html',
      controller: 'authCtrl',
      controllerAs: 'vm',
      access: { restricted: function restricted() {
          return false;
        } }
    }).when('/company/signup', {
      templateUrl: './auth/company-signup.html',
      controller: 'authCtrl',
      controllerAs: 'vm',
      access: { restricted: function restricted() {
          return false;
        } }
    }).when('/company/login', {
      templateUrl: './auth/company-login.html',
      controller: 'authCtrl',
      controllerAs: 'vm',
      access: { restricted: function restricted() {
          return false;
        } }
    }).when('/offerings', {
      templateUrl: './offerings/offerings.html',
      controller: 'offeringsCtrl',
      controllerAs: 'vm',
      access: { restricted: function restricted() {
          return false;
        } }
    }).when('/offerings/:id', {
      templateUrl: './offerings/offering.html',
      controller: 'offeringsCtrl',
      controllerAs: 'vm',
      access: { restricted: function restricted() {
          return false;
        } }
    }).when('/listings', {
      url: '/listings',
      templateUrl: './listings/listings.html',
      controller: 'listingsCtrl',
      controllerAs: 'vm',
      access: { restricted: function restricted(Auth) {
          return Auth.getUserTypeSync() !== 'company';
        } }
    }).when('/listings/:id', {
      templateUrl: './listings/listing.html',
      controller: 'listingsCtrl',
      controllerAs: 'vm',
      access: { restricted: function restricted(Auth) {
          return Auth.getUserTypeSync() !== 'company';
        } }
    }).when('/portfolio', {
      templateUrl: './portfolio/portfolio.html',
      controller: 'portfolioCtrl',
      controllerAs: 'vm',
      access: { restricted: function restricted(Auth) {
          return Auth.getUserTypeSync() !== 'investor';
        } }
    }).otherwise({
      redirectTo: '/home',
      access: { restricted: function restricted() {
          return false;
        } }
    });

    $locationProvider.html5Mode(true);
  }]);

  app.run(['$rootScope', '$location', '$route', 'Auth', function ($rootScope, $location, $route, Auth) {
    $rootScope.$on('$routeChangeStart', function (event, next, current) {
      Auth.getUserTypeAsync().then(function () {
        if (next.access && next.access.restricted(Auth)) {
          $location.path('/home');
          $route.reload();
        }
      });
    });
  }]);
})();