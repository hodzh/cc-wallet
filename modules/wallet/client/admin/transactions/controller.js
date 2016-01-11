(function (window, angular) { 'use strict';

  angular.module('walleApp.wallet.admin')
    .controller('AdminTransactionsController', ['AdminTransactions', 'AdminTransactionSchema', AdminTransactionsController]);

  function AdminTransactionsController(AdminTransactions, AdminTransactionSchema) {
    var vm = this;
    vm.errors = [];
    vm.transactionSchema = AdminTransactionSchema;
    vm.transactions = AdminTransactions.query();
  }

})(window, window.angular);