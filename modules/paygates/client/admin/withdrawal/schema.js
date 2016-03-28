(function (window, angular) { 'use strict';

  angular.module('walleApp.paygates.admin')
    .factory('AdminWithdrawalSchema', [AdminWithdrawalSchema]);

  function AdminWithdrawalSchema() {
    return [
      {
        title: 'currency',
        schemaKey: 'currency',
        type: 'text',
        inTable: true
      },
      {
        title: 'update date',
        schemaKey: 'updateDate',
        type: 'text',
        inTable: true
      }
    ];
  }

})(window, window.angular);
