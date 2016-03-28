(function (window, angular) { 'use strict';

  /**
   * fix 'remember password' feature
   * https://github.com/angular/angular.js/issues/1460
   * Form model doesn't update on autocomplete #1460
   */
  angular.module('walleApp.ui')
    .directive('xsInputSync', ['$timeout', xsInputSync]);

  function xsInputSync($timeout) {
    return {
      restrict : "A",
      require: "?ngModel",
      link: xsInputSyncLink
    };

    function xsInputSyncLink(scope, element, attrs, ngModel) {
      $timeout(updateViewValueTimeout, 500);

      function updateViewValueTimeout() {
        if (ngModel.$viewValue && ngModel.$viewValue !== element.val()) {
          scope.apply(updateViewValue);
        }
      }

      function updateViewValue() {
        ngModel.$setViewValue(element.val());
      }
    }
  }

})(window, window.angular);
