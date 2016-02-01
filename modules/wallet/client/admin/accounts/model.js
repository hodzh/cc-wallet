(function (window, angular) { 'use strict';

  angular.module('walleApp.wallet.admin')
    .factory('AdminAccounts', ['$resource', AdminAccounts]);

  function AdminAccounts($resource) {
    return $resource(
      '/aapi/account/:id/:controller',
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
