(function (window, angular) { 'use strict';

  angular.module('walleApp.ui').directive('ngEditableParagraph', editableParagraph);

  function editableParagraph() {
    return {
      // can be in-lined or async loaded by xhr
      // or inlined as JS string (using template property)
      template:
      '<span class="editable-wrapper">' +
      '<span data-ng-hide="edit" data-ng-click="edit=true;value=model;" class="respect-newline">{{model}}</span>' +
      '<textarea data-ng-model="value" data-ng-blur="model=value ; edit=false" data-ng-show="edit" data-ng-enter="model=value;edit=false;" class="span8"></textarea>' +
      '</span>',
      scope: {
        model: '=ngEditableModel',
        update: '&ngEditableParagraph'
      },
      replace: true,
      link: editableParagraphLink
    };
  }

  function editableParagraphLink(scope, element, attrs) {
    scope.focus = function() {
      element.find("input").focus();
    };
    scope.$watch('edit', onEdit);

    function onEdit(isEditable) {
      if (isEditable === false) {
        scope.update();
      } else {
        scope.focus();
      }
    }
  }

})(window, window.angular);