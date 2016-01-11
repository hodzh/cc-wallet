(function (window, angular) { 'use strict';

  angular.module('walleApp.wallet.user')
    .factory('UserAccounts', ['$resource', UserAccounts]);

  function UserAccounts($resource) {
    return $resource('/api/account/:id/:controller',
      {
        id: '@_id'
      },
      {
        enable: {
          method: 'PUT',
          params: {
            controller:'enable'
          }
        },
        disable: {
          method: 'PUT',
          params: {
            controller:'disable'
          }
        },
        cashOut: {
          method: 'PUT',
          params: {
            controller:'cashout'
          }
        }
      });
  }

})(window, window.angular);
