(function (window, angular) { 'use strict';

  angular.module('walleApp.paygates.admin')
    .controller('AdminDepositController', ['AdminDeposit', 'AdminDepositSchema', AdminDepositController]);

  function AdminDepositController(AdminDeposit, AdminDepositSchema) {
    var vm = this;
    vm.deposits = [];
    vm.deposits = AdminDeposit.query(angular.noop, onError);
    vm.depositSchema = AdminDepositSchema;

    vm.init = init;
    vm.add = add;
    vm.remove = remove;
    vm.update = update;
    vm.beforeSelect = beforeSelect;
    vm.refresh = refresh;

    function init() {
      AdminDeposit.query({}, function(deposits) {
        vm.deposits = deposits;
      });
    }

    function add(valid) {
      if (!valid) return;
      if (!vm.deposits) vm.deposits = [];

      var deposit = new AdminDeposit(vm.deposit);
      deposit.$save(onSave, onSaveError);

      function onSave(data, headers) {
        vm.deposit = {};
        vm.deposits.push(deposit);
        vm.depositError = null;
      }

      function onSaveError(data) {
        vm.depositError = data.data;
      }
    }

    function onError(err) {

    }

    function remove(deposit) {
      if (!confirm([
          'Are you sure want to remove',
          deposit.role,
          deposit.email,
          '?'].join(' '))){
        return;
      }
      deposit.$remove(onRemove, onRemoveError);

      function onRemove(deposit) {
        for (var i in vm.deposits) {
          if (vm.deposits[i] === deposit) {
            vm.deposits.splice(i, 1);
          }
        }
      }

      function onRemoveError(response) {
      }
    }

    function update(deposit, depositField) {
      deposit.$update();
    }

    function beforeSelect(depositField, deposit) {

    }

    function refresh(deposit) {
      deposit.$get();
    }
  }

})(window, window.angular);
