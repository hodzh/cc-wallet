(function (window, angular) { 'use strict';

  angular.module('walleApp.vp.user')
    .factory('UserDepositSchema', [UserDepositSchema]);

  function UserDepositSchema() {
    return [
      {
        title: 'owner',
        schemaKey: 'owner',
        type: 'text',
        inTable: true
      },
      {
        title: 'account',
        schemaKey: 'account',
        type: 'text',
        inTable: true
      },
      {
        title: 'currency',
        schemaKey: 'currency',
        type: 'text',
        inTable: true
      },
      {
        title: 'updated',
        schemaKey: 'updated',
        type: 'text',
        inTable: true
      }
    ];
  }

})(window, window.angular);
