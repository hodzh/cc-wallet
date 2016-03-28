(function (window, angular) { 'use strict';

  angular.module('walleApp')
    .controller('SignupController', ['Auth', '$state', SignupController]);

  function SignupController(Auth, $state) {
    var vm = this;
    vm.user = {};
    vm.errors = {};
    vm.submitted = false;
    vm.Auth = Auth;
    vm.$state = $state;

    vm.register = function(form) {
      vm.submitted = true;

      if (form.$invalid) {
        return;
      }

      vm.Auth.createUser({
          email: vm.user.email,
          password: vm.user.password
        })
        .then(function() {
          // Account created, redirect to home
          vm.$state.go('main');
        })
        .catch(function(err) {
          err = err.data;
          vm.errors = {};

          // Update validity of form fields that match the mongoose errors
          angular.forEach(err.errors, function(error, field) {
            form[field].$setValidity('mongoose', false);
            vm.errors[field] = error.message;
          });
        });
    }
  }

})(window, window.angular);