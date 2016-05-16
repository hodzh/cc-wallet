(function (window, angular) { 'use strict';

  angular.module('walleApp.wallet.admin')
    .controller('AdminAccountsController', ['AdminAccounts', 'AdminAccountSchema', AdminAccountsController]);

  function AdminAccountsController(AdminAccounts, AdminAccountSchema) {
    var vm = this;
    vm.accounts = [];
    vm.accounts = AdminAccounts.query(angular.noop, onError);
    vm.accountSchema = AdminAccountSchema;

    vm.init = init;
    vm.add = add;
    vm.remove = remove;
    vm.update = update;
    vm.beforeSelect = beforeSelect;
    vm.income = income;
    vm.outcome = outcome;
    vm.refresh = refresh;

    function init() {
      AdminAccounts.query({}, function(accounts) {
        vm.accounts = accounts;
      });
    }

    function add(valid) {
      if (!valid) return;
      if (!vm.accounts) vm.accounts = [];

      var account = new AdminAccounts(vm.account);
      account.$save(onSave, onSaveError);

      function onSave(data, headers) {
        vm.account = {};
        vm.accounts.push(account);
        vm.accountError = null;
      }

      function onSaveError(data) {
        vm.accountError = data.data;
      }
    }

    function onError(data) {
    }

    function remove(account) {
      if (!confirm([
          'Are you sure want to remove',
          account.role,
          account.email,
          '?'].join(' '))){
        return;
      }
      account.$remove(onRemove, onRemoveError);

      function onRemove(account) {
        for (var i in vm.accounts) {
          if (vm.accounts[i] === account) {
            vm.accounts.splice(i, 1);
          }
        }
      }

      function onRemoveError(response) {
      }
    }

    function update(account, accountField) {
      account.$update();
    }

    function beforeSelect(accountField, account) {

    }

    function income(account, amount) {
      account.$income({
          amount: amount
        });
    }

    function outcome(account, amount) {
      account.$outcome({
          amount: amount
        });
    }

    function refresh(account) {
      account.$get();
    }
  }

})(window, window.angular);
