(function (window, angular) { 'use strict';

  angular.module('walleApp')
    .directive('footer', footer);

  function footer() {
    return {
      templateUrl: 'components/footer/footer.html',
      restrict: 'E',
      link: function (scope, element) {
        element.addClass('footer');
      }
    };
  }

})(window, window.angular);