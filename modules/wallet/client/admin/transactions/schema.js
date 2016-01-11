(function (window, angular) { 'use strict';

  angular.module('walleApp.wallet.admin')
    .factory('AdminTransactionSchema', [AdminTransactionSchema]);

  function AdminTransactionSchema() {
    return [
      {
        title: 'Create Date',
        schemaKey: 'createDate',
        type: 'text',
        inTable: true,
        auto: true
      },
      {
        title: 'Update Date',
        schemaKey: 'updateDate',
        type: 'text',
        inTable: true,
        auto: true
      },
      {
        title: 'Currency',
        schemaKey: 'currency',
        type: 'text',
        inTable: true
      },
      {
        title: 'Category',
        schemaKey: 'category',
        type: 'text',
        inTable: true
      },
      {
        title: 'Amount',
        schemaKey: 'amount',
        type: 'text',
        inTable: true
      },
      {
        title: 'Purpose',
        schemaKey: 'purpose',
        type: 'text',
        inTable: true
      },
      {
        title: 'Status',
        schemaKey: 'status',
        type: 'text',
        inTable: true
      },
      {
        title: 'From',
        schemaKey: 'from',
        type: 'text',
        inTable: true
      },
      {
        title: 'To',
        schemaKey: 'to',
        type: 'text',
        inTable: true
      },
      {
        title: 'State',
        schemaKey: 'state',
        type: 'text',
        inTable: true
      },
      {
        title: 'Error',
        schemaKey: 'error',
        type: 'text',
        inTable: true
      }
    ];
  }

})(window, window.angular);
