(() => {
  'use strict';
  const app = angular.module('drakesCrowd');

  app.factory('Mathy', [function() {

    const toPercent = (num) => `${num * 100}%`;

    const sortBy = (array, conditions, type) => {
      type = type.split('.');
      const len = type.length;

      array = array.sort((a, b) => {

        // got this from http://stackoverflow.com/questions/5073799/how-to-sort-a-javascript-array-of-objects-by-nested-object-property
        let i = 0;
        while( i < len ) { a = a[type[i]]; b = b[type[i]]; i++; }
        if (!conditions[type]) {
          if (a < b)
            return -1;
          if (a > b)
            return 1;
          return 0;
        } else {
          if (b < a)
            return -1;
          if (b > a)
            return 1;
          return 0;
        }
      });
      conditions[type] = !conditions[type];
    };

    return {
      toPercent,
      sortBy
    };

  }]);

})();
