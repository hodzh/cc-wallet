(function (window, angular) { 'use strict';

  angular.module('walleApp.paygates.user')
    .directive('withdrawalForm', withdrawalForm);

  function withdrawalForm() {
    return {
      templateUrl: 'modules/paygates/client/user/withdrawal-form/index.html',
      restrict: 'E',
      //replace:true,
      controller:'WithdrawalFormController',
      controllerAs:'withdrawalForm',
      scope: {
        account: '='
      },
      link: withdrawalFormControllerLink
    };
  }

  function withdrawalFormControllerLink(scope, element, attrs){

  }

})(window, window.angular);