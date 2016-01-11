(function (window, angular) { 'use strict';

  /**
   * Removes server error when user updates input
   */
  angular.module('walleApp')
    .directive('mongooseError', mongooseError);

  function mongooseError() {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function(scope, element, attrs, ngModel) {
        scope.$watch(attrs['ngModel'], function () {
          ngModel.$setValidity('mongoose', true);
        });
      }
    };
  }

})(window, window.angular);