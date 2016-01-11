(function (window, angular) { 'use strict';

  angular.module('walleApp.ui').directive('ngEditable', editable);

  function editable() {
    return {
      // can be in-lined or async loaded by xhr
      // or inlined as JS string (using template property)
      template:
      '<span class="editable-wrapper">' +
      '<span data-ng-hide="edit" data-ng-click="edit=true;value=model;">{{model}}</span>' +
      '<input type="text" data-ng-model="value" data-ng-blur="edit = false; model = value" data-ng-show="edit" data-ng-enter="model=value;edit=false;"/>' +
      '</span>',
      scope: {
        model: '=ngEditableModel',
        update: '&ngEditable'
      },
      replace: true,
      link: editableLink
    };
  }

  function editableLink(scope, element, attrs) {
    scope.focus = function() {
      element.find("input").focus();
    };
    scope.$watch('edit', onEdit);

    function onEdit(isEditable) {
      if (isEditable === false) {
        scope.update();
      } else {
        // scope.focus();
      }
    }
  }

})(window, window.angular);