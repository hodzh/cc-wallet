(function (window, angular) { 'use strict';

  angular.module('walleApp.wallet.admin')
    .factory('AdminAccountSchema', [AdminAccountSchema]);

  function AdminAccountSchema() {
    return [
      {
        title: 'create date',
        schemaKey: 'createDate',
        type: 'text',
        inTable: true
      },
      {
        title: 'update date',
        schemaKey: 'updateDate',
        type: 'text',
        inTable: true
      },
      {
        title: 'type',
        schemaKey: 'type',
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
        title: 'balance',
        schemaKey: 'balance',
        type: 'text',
        inTable: true
      },
      {
        title: 'address',
        schemaKey: 'address',
        type: 'text',
        inTable: true
      }
    ];
  }

})(window, window.angular);
