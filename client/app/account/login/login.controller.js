(function (window, angular) { 'use strict';

    angular.module('walleApp')
        .controller('LoginController', ['Auth', '$state', LoginController]);

    function LoginController(Auth, $state) {
        var _this = this;
        _this.user = {};
        _this.errors = {};
        _this.submitted = false;
        _this.Auth = Auth;
        _this.$state = $state;

        _this.login = function(form) {
            _this.submitted = true;

            if (form.$valid) {
                _this.Auth.login({
                        email: _this.user.email,
                        password: _this.user.password
                    })
                    .then(function() {
                        // Logged in, redirect to home
                        _this.$state.go('main');
                    })
                    .catch(function(err) {
                        if (err) {
                            _this.errors.other = err.message || err;
                        }
                    });
            }
        }
    }

})(window, window.angular);