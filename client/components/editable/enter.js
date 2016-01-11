(function (window, angular) { 'use strict';

  angular.module('walleApp.ui').directive('ngEnter', enter);

  function enter() {
    return enterLink;
  }

  function enterLink(scope, elm, attrs) {
    elm.bind('keypress', onKeyPress);

    function onKeyPress(e) {
      if (e.charCode === 13 && !e.ctrlKey){
        scope.$apply(attrs.ngEnter);
      }
    }
  }

})(window, window.angular);