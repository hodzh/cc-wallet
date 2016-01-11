(function (window, angular) { 'use strict';

  angular.module('walleApp.admin')
    .controller('UsersController', ['UserResource', UsersController]);

  function UsersController(User) {
    var vm = this;
    vm.showForm = true;
    vm.users = User.query();
    vm.userSchema = [
      {
        title: 'Email',
        schemaKey: 'email',
        type: 'email',
        inTable: true
      },
      {
        title: 'Name',
        schemaKey: 'name',
        type: 'text',
        inTable: true
      },
      {
        title: 'Role',
        schemaKey: 'role',
        type: 'select',
        options: [
          "user",
          "admin"
        ],
        inTable: true
      },
      {
        title: 'Password',
        schemaKey: 'password',
        type: 'password',
        inTable: false
      },
      {
        title: 'Repeat password',
        schemaKey: 'confirmPassword',
        type: 'password',
        inTable: false
      }
    ];

    vm.init = init;
    vm.add = add;
    vm.remove = remove;
    vm.update = update;
    vm.beforeSelect = beforeSelect;

    function init() {
      User.query({}, function(users) {
        vm.users = users;
      });
    }

    function add(valid) {
      if (!valid) return;
      if (!vm.users) vm.users = [];

      var user = new User({
        email: vm.user.email,
        name: vm.user.name,
        password: vm.user.password,
        role: vm.user.role
      });

      user.$save(function(data, headers) {
        vm.user = {};
        vm.users.push(user);
        vm.userError = null;
      }, function(data, headers) {
        vm.userError = data.data;
      });
    }

    function remove(user) {
      if (!confirm([
          'Are you sure want to remove',
          user.role,
          user.email,
          '?'].join(' '))){
        return;
      }
      user.$remove(onRemove, onRemoveError);

      function onRemove(user) {
        for (var i in vm.users) {
          if (vm.users[i] === user) {
            vm.users.splice(i, 1);
          }
        }
      }

      function onRemoveError(response) {
      }
    }

    function update(user, userField) {
      if (userField &&
        userField === 'role' &&
        user.tmpRole === 'admin' &&
        user.role !== 'admin') {
        if (confirm('Are you sure you want to remove "admin" role?')) {
          user.$update();
        } else {
          user.role = user.tmpRole;
        }
      } else {
        user.$update();
      }
    }

    function beforeSelect(userField, user) {
      if (userField === 'role') {
        user.tmpRole = user.role;
      }
    }
  }

})(window, window.angular);