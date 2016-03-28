(function (window, angular) { 'use strict';

  angular.module('walleApp.vp.admin')
    .factory('AdminDepositSchema', [AdminDepositSchema]);

  function AdminDepositSchema() {
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
        title: 'updateDate',
        schemaKey: 'updateDate',
        type: 'text',
        inTable: true
      }
    ];
  }

})(window, window.angular);
