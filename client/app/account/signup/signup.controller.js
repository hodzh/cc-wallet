(function (window, angular) { 'use strict';

  angular.module('walleApp')
      .controller('SignupController', ['Auth', '$state', SignupController]);

    function SignupController(Auth, $state) {
        var _this = this;
        _this.user = {};
        _this.errors = {};
        _this.submitted = false;
        _this.Auth = Auth;
        _this.$state = $state;

        _this.register = function(form) {
            _this.submitted = true;

            if (form.$valid) {
                _this.Auth.createUser({
                        name: _this.user.name,
                        email: _this.user.email,
                        password: _this.user.password
                    })
                    .then(function() {
                        // Account created, redirect to home
                        _this.$state.go('main');
                    })
                    .catch(function(err) {
                        err = err.data;
                        _this.errors = {};

                        // Update validity of form fields that match the mongoose errors
                        angular.forEach(err.errors, function(error, field) {
                            form[field].$setValidity('mongoose', false);
                            _this.errors[field] = error.message;
                        });
                    });
            }
        }
    }

})(window, window.angular);