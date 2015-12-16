(function (window, angular) { 'use strict';

  angular.module('walleApp.admin')
      .controller('AdminController', ['User', AdminController]);

  function AdminController(User) {
    var _this = this;
    _this.users = User.query();

    _this.delete = function (user) {
      user.$remove();
      _this.users.splice(_this.users.indexOf(user), 1);
    }
  }

})(window, window.angular);