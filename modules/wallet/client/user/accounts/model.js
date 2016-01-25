(function (window, angular) { 'use strict';

  angular.module('walleApp.wallet.user')
    .factory('UserAccounts', ['$resource', UserAccounts]);

  function UserAccounts($resource) {
    return $resource('/api/account/:currency/:id/:controller',
      {
      },
      {
        get: {
          method: 'GET',
          params: {
            id: '@_id'
          }
        },
        enable: {
          method: 'PUT',
          params: {
            controller: 'enable',
            currency: '@currency'
          }
        },
        disable: {
          method: 'PUT',
          params: {
            controller:'disable',
            currency: '@currency'
          }
        },
        cashOut: {
          method: 'PUT',
          params: {
            id: '@_id'
          }
        }
      });
  }

})(window, window.angular);
