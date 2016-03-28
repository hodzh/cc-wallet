(function (window, angular) { 'use strict';

  angular.module('walleApp.paygates.user')
    .controller('UserWithdrawalController', ['UserWithdrawal', 'UserWithdrawalSchema', UserWithdrawalController]);

  function UserWithdrawalController(UserWithdrawal, UserWithdrawalSchema) {
    var vm = this;
    vm.withdrawals = [];
    vm.withdrawals = UserWithdrawal.query(angular.noop, onError);
    vm.withdrawalSchema = UserWithdrawalSchema;

    vm.init = init;
    vm.add = add;
    vm.remove = remove;
    vm.update = update;
    vm.beforeSelect = beforeSelect;
    vm.refresh = refresh;

    function init() {
      UserWithdrawal.query({}, function(withdrawals) {
        vm.withdrawals = withdrawals;
      });
    }

    function add(valid) {
      if (!valid) return;
      if (!vm.withdrawals) vm.withdrawals = [];

      var withdrawal = new UserWithdrawal(vm.withdrawal);
      withdrawal.$save(onSave, onSaveError);

      function onSave(data, headers) {
        vm.withdrawal = {};
        vm.withdrawals.push(withdrawal);
        vm.withdrawalError = null;
      }

      function onSaveError(data) {
        vm.withdrawalError = data.data;
      }
    }

    function onError(err) {

    }

    function remove(withdrawal) {
      if (!confirm([
          'Are you sure want to remove',
          withdrawal.role,
          withdrawal.email,
          '?'].join(' '))){
        return;
      }
      withdrawal.$remove(onRemove, onRemoveError);

      function onRemove(withdrawal) {
        for (var i in vm.withdrawals) {
          if (vm.withdrawals[i] === withdrawal) {
            vm.withdrawals.splice(i, 1);
          }
        }
      }

      function onRemoveError(response) {
      }
    }

    function update(withdrawal, withdrawalField) {
      withdrawal.$update();
    }

    function beforeSelect(withdrawalField, withdrawal) {

    }

    function refresh(withdrawal) {
      withdrawal.$get();
    }
  }

})(window, window.angular);
