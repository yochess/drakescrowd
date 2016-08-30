'use strict';

(function () {
  'use strict';

  var app = angular.module('drakesCrowd');

  app.controller('authCtrl', ['Auth', '$location', function (Auth, $location) {
    var vm = this;

    vm.auth = {};

    vm.signup = function (userType) {
      vm.auth.userType = userType;

      Auth.signup(vm.auth).then(function () {
        var link = Auth.getUserTypeSync() === 'investor' ? 'portfolio' : 'listings';
        $location.path(link);
      });

      vm.auth = {};
    };

    vm.login = function (userType) {
      vm.auth.userType = userType;

      Auth.login(vm.auth).then(function () {
        var link = Auth.getUserTypeSync() === 'investor' ? 'portfolio' : 'listings';
        $location.path(link, { reload: true });
      });

      vm.auth = {};
    };
  }]);

  app.factory('Auth', ['$http', '$q', function ($http, $q) {
    var userType = '';

    var getUserTypeSync = function getUserTypeSync() {
      return userType;
    };

    var getUserTypeAsync = function getUserTypeAsync() {
      return $http.get('/auth/userType').success(function (data) {
        userType = data;
      }).error(function (err) {
        userType = '';
      });
    };

    var signup = function signup(user) {
      var deferred = $q.defer();

      $http.post('/auth/signup', user).success(function (data, status) {
        if (status !== 201) {
          userType = '';
          deferred.reject();
        } else {
          userType = data;
          deferred.resolve();
        }
      }).error(function (data) {
        userType = '';
        deferred.reject();
      });

      return deferred.promise;
    };

    var login = function login(user) {
      var deferred = $q.defer();

      $http.post('/auth/login', user).success(function (data, status) {
        if (status !== 200) {
          userType = '';
          deferred.reject();
        } else {
          userType = data;
          deferred.resolve();
        }
      }).error(function (data) {
        userType = '';
        deferred.reject();
      });

      return deferred.promise;
    };

    var logout = function logout() {
      var deferred = $q.defer();

      $http.get('/auth/logout').success(function (data) {
        userType = '';
        deferred.resolve();
      }).error(function (data) {
        userType = '';
        deferred.reject();
      });

      return deferred.promise;
    };

    return {
      getUserTypeSync: getUserTypeSync,
      getUserTypeAsync: getUserTypeAsync,
      signup: signup,
      login: login,
      logout: logout
    };
  }]);
})();