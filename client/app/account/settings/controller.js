(function (window, angular) { 'use strict';

  angular.module('walleApp')
    .controller('SettingsController', ['Auth', SettingsController]);

  function SettingsController(Auth) {
    var vm = this;
    vm.errors = {};
    vm.submitted = false;
    vm.Auth = Auth;

    vm.changePassword = function(form) {
      vm.submitted = true;

      if (form.$valid) {
        vm.Auth.changePassword(vm.user.oldPassword, vm.user.newPassword)
          .then(function() {
            vm.message = 'Password successfully changed.';
          })
          .catch(function() {
            form.password.$setValidity('mongoose', false);
            vm.errors.other = 'Incorrect password';
            vm.message = '';
          });
      }
    }
  }

})(window, window.angular);