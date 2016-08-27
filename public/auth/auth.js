(() => {
  'use strict';

  const app = angular.module('drakesCrowd')

  app.controller('authCtrl', ['Auth', function(Auth) {
    const vm = this;

    vm.auth = {};

    vm.signup = (userType) => {
      vm.auth.userType = userType;

      Auth.signup(vm.auth)
        .then(() => {
          console.log('signed up!');
        })
        .catch(() => {
          console.log('error in signing in');
        });

      vm.auth = {};
    };

    vm.login = (userType) => {
      vm.auth.userType = userType;
      Auth.login(vm.auth)
      .then(() => {
        console.log('logged in!');
      })
      .catch(() => {
        console.log('error in logging in');
      });

      vm.auth = {};
    };

  }]);

  app.factory('Auth', ['$http', '$q', function($http, $q) {

    const signup = (user) => {
      const deferred = $q.defer();

      $http.post('/auth/signup', user)
        .success((data, status) => {
          status !== 201 ? deferred.reject() : deferred.resolve();
        })
        .error((data) => { deferred.reject() });

      return deferred.promise;
    };

    const login = (user) => {
      const deferred = $q.defer();

      $http.post('/auth/login', user)
        .success((data, status) => {
          status !== 200 ? deferred.reject() : deferred.resolve();
        })
        .error(data => { deferred.reject() });

      return deferred.promise;
    };

    return {
      signup,
      login
    }

  }]);

})();
