(function (window, angular) { 'use strict';

  angular.module('walleApp.paygates.user')
    .factory('UserWithdrawal', ['$resource', UserWithdrawal]);

  function UserWithdrawal($resource) {
    return $resource(
      '/api/paygates/withdrawal/:id/:controller',
      {
        id: '@_id'
      },
      {
        income: {
          method: 'PUT',
          params: {
            controller:'income'
          }
        },
        outcome: {
          method: 'PUT',
          params: {
            controller:'outcome'
          }
        }
      }
    );
  }

})(window, window.angular);
