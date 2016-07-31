(function (window, angular) { 'use strict';

  angular.module('walleApp.paygates.user')
    .factory('UserWithdrawalSchema', [UserWithdrawalSchema]);

  function UserWithdrawalSchema() {
    return [
      {
        title: 'currency',
        schemaKey: 'currency',
        type: 'text',
        inTable: true
      },
      {
        title: 'update date',
        schemaKey: 'updated',
        type: 'text',
        inTable: true
      }
    ];
  }

})(window, window.angular);
