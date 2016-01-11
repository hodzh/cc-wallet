(function (window, angular) { 'use strict';

  angular.module('walleApp.ui')
    .directive('emailInput', emailInput);

  function emailInput() {
    return {
      templateUrl: 'components/email/index.html',
      restrict: 'E',
      replace:true,
      controller:'EmailInputController',
      controllerAs:'vm',
      scope: {
      },
      require: "?ngModel",
      link: emailInputLink
    };
  }

  function emailInputLink(scope, element, attrs, ngModel){
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