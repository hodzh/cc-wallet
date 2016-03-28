(function (window, angular) { 'use strict';

  angular.module('walleApp.paygates.user')
    .controller('WithdrawalFormController', ['$scope', 'UserWithdrawal', WithdrawalFormController]);

  function WithdrawalFormController($scope, UserWithdrawal) {
    var vm = this;
    vm.withdrawalInfo = {};
    vm.submit = submit;

    function submit() {
      var withdrawal = new UserWithdrawal(vm.withdrawalInfo);
      withdrawal.account = $scope.account._id;
      withdrawal.$save(onWithdrawal);

      function onWithdrawal(data){
        console.log(data);
      }
    }
  }

})(window, window.angular);