(function (window, angular) { 'use strict';

  angular.module('walleApp')
    .controller('LoginController', ['Auth', '$state', LoginController]);

  function LoginController(Auth, $state) {
    var vm = this;
    vm.user = {};
    vm.errors = {};
    vm.submitted = false;

    vm.login = function(form) {
      vm.submitted = true;
      if (!form.email.$error.mongoose ||
        !form.password.$error.mongoose)
      {
        form.email.$setValidity('mongoose', true);
        form.password.$setValidity('mongoose', true);
      }
      if (form.$invalid) {
        return;
      }

      Auth.login({
          email: vm.user.email,
          password: vm.user.password
        })
        .then(onLogin)
        .catch(onLoginError);

      function onLogin() {
        window.history.replaceState({success:true}, 'login', "/login");
        $state.go('main');
      }

      function onLoginError(err) {
        if (err) {
          form.email.$setValidity('mongoose', false);
          form.password.$setValidity('mongoose', false);
          vm.errors.other = err.message || err;
        }
      }
    }
  }

})(window, window.angular);