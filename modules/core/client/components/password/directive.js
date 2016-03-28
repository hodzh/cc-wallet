(function (window, angular) { 'use strict';

  angular.module('walleApp.ui')
    .directive('passwordInput', passwordInput);

  function passwordInput() {
    return {
      templateUrl: 'modules/core/client/components/password/index.html',
      restrict: 'E',
      //replace:true,
      controller:'PasswordInputController',
      controllerAs:'vm',
      scope: {
        placeholderHidden: '@',
        placeholderVisible: '@'
      },
      require: "?ngModel",
      link: passwordInputLink
    };
  }

  function passwordInputLink(scope, element, attrs, ngModel){
    if (!ngModel) return;

    scope.$watch('value', onChange);
    ngModel.$render = render;

    function onChange(){
      ngModel.$setViewValue(scope.value);
    }

    function render(){
      scope.value = ngModel.$modelValue;
    }
  }

})(window, window.angular);