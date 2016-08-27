(() => {
  'use strict';

  const app = angular.module('drakesCrowd');

  app.controller('authCtrl', ['Auth', '$state', function(Auth, $state) {
    const vm = this;

    vm.auth = {};

    vm.signup = (userType) => {
      vm.auth.userType = userType;

      Auth.signup(vm.auth).then(() => {
        const link = Auth.getUserTypeSync() === 'investor' ? 'portfolio' : 'listings';
        $state.go(link);
      })

      vm.auth = {};
    };

    vm.login = (userType) => {
      vm.auth.userType = userType;

      Auth.login(vm.auth).then(() => {
        const link = Auth.getUserTypeSync() === 'investor' ? 'portfolio' : 'listings';
        $state.go(link,{reload:true});
      });

      vm.auth = {};
    };

  }]);

  app.factory('Auth', ['$http', '$q', function($http, $q) {
    let userType = '';

    const getUserTypeSync = () => {
      return userType;
    };

    const getUserTypeAsync = () => {
      return $http
        .get('/auth/userType')
        .success(data => {
          userType = data;
        })
        .error(err => { userType = ''});
    };


    const signup = (user) => {
      const deferred = $q.defer();

      $http.post('/auth/signup', user)
        .success((data, status) => {
          if (status !== 201) {
            userType = '';
            deferred.reject();
          } else {
            userType = data;
            deferred.resolve();
          }
        })
        .error(data => {
          userType = '';
          deferred.reject();
        });

      return deferred.promise;
    };

    const login = (user) => {
      const deferred = $q.defer();

      $http.post('/auth/login', user)
        .success((data, status) => {
          if (status !== 200) {
            userType = '';
            deferred.reject();
          } else {
            userType = data;
            deferred.resolve();
          }
        })
        .error(data => {
          userType = '';
          deferred.reject();
        });

      return deferred.promise;
    };

    const logout = () => {
      const deferred = $q.defer();

      $http.get('/auth/logout')
        .success(data => {
          userType = '';
          deferred.resolve();
        })
        .error(data => {
          userType = '';
          deferred.reject();
        });

      return deferred.promise;
    };

    return {
      getUserTypeSync,
      getUserTypeAsync,
      signup,
      login,
      logout
    }

  }]);

})();
