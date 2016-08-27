(() => {
  'use strict';

  const app = angular.module('drakesCrowd')

  app.controller('authCtrl', ['Auth', '$state', function(Auth, $state) {
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

    vm.logout = () => {
      Auth.logout().then(() => { $state.go('home') });
    }

  }]);

  app.factory('Auth', ['$http', '$q', function($http, $q) {
    let user = null;

    const isLoggedIn = () => {
      return user ? true : false;
    };

    const getUserStatus = () => {
      return user;
    };


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

    const logout = () => {
      const deferred = $q.defer();

      $http.get('/auth/logout')
        .success(data => {
          user = false;
          deferred.resolve();
        })
        .error(data => { deferred.reject() });

      return deferred.promise;
    };

    return {
      signup,
      login,
      logout
    }

  }]);

})();
