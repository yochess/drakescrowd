(() => {
  'use strict';

  const app = angular.module('drakesCrowd')

  app.controller('mainCtrl', ['$scope', function($scope) {
    const vm = this;

  }]);

  app.factory('Main', ['$http', function($http) {

    const fetchOfferings = () => {
      return $http.get('/api/offerings').then(res => {
        return res.data;
      });
    };

    const fetchOffering = (id) => {
      console.log('hi');
      return $http.get(`/api/offerings/${id}`).then(res => {
        return res.data;
      });
    };

    return {
      fetchOfferings,
      fetchOffering
    }

  }]);

})();
