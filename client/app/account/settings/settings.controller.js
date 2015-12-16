(function (window, angular) { 'use strict';

  angular.module('walleApp')
      .controller('SettingsController', ['Auth', SettingsController]);

  function SettingsController(Auth) {
    var _this = this;
    _this.errors = {};
    _this.submitted = false;
    _this.Auth = Auth;

    _this.changePassword = function(form) {
      _this.submitted = true;

      if (form.$valid) {
        _this.Auth.changePassword(_this.user.oldPassword, _this.user.newPassword)
            .then(function() {
              _this.message = 'Password successfully changed.';
            })
            .catch(function() {
              form.password.$setValidity('mongoose', false);
              _this.errors.other = 'Incorrect password';
              _this.message = '';
            });
      }
    }
  }

})(window, window.angular);