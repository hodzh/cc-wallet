(function (window, angular) { 'use strict';

  angular.module('walleApp.ui')
    .controller('PasswordInputController', ['$scope', PasswordInputController]);

  function PasswordInputController($scope) {
    var vm = this;
    var state = {
      hidden: {
        type: 'password',
        placeholder: $scope.placeholderHidden || 'Password',
        iconClass: '',
        tooltipText: 'Show password'
      },
      visible: {
        type: 'text',
        placeholder: $scope.placeholderVisible || 'Visible Password',
        iconClass: 'icon-hide-password',
        tooltipText: 'Hide password'
      }
    };

    vm.input = state.hidden;
    vm.togglePasswordVisible = togglePasswordVisible;

    function togglePasswordVisible() {
      vm.input = state.hidden == vm.input ?
        state.visible : state.hidden;
    }
  }

})(window, window.angular);