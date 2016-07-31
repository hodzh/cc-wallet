(function (window, angular) { 'use strict';

  angular.module('walleApp.paygates.admin')
    .factory('AdminWithdrawal', ['$resource', AdminWithdrawal]);

  function AdminWithdrawal($resource) {
    return $resource(
      '/aapi/paygates/withdrawal/:id/:controller',
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
