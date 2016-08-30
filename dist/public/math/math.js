'use strict';

(function () {
  'use strict';

  var app = angular.module('drakesCrowd');

  app.factory('Mathy', [function () {

    var toPercent = function toPercent(num) {
      return num * 100 + '%';
    };

    var sortBy = function sortBy(array, conditions, type) {
      type = type.split('.');
      var len = type.length;

      array = array.sort(function (a, b) {

        // got this from http://stackoverflow.com/questions/5073799/how-to-sort-a-javascript-array-of-objects-by-nested-object-property
        var i = 0;
        while (i < len) {
          a = a[type[i]];b = b[type[i]];i++;
        }
        if (!conditions[type]) {
          if (a < b) return -1;
          if (a > b) return 1;
          return 0;
        } else {
          if (b < a) return -1;
          if (b > a) return 1;
          return 0;
        }
      });
      conditions[type] = !conditions[type];
    };

    return {
      toPercent: toPercent,
      sortBy: sortBy
    };
  }]);
})();