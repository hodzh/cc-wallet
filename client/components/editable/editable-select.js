(function (window, angular) { 'use strict';

  angular.module('walleApp.ui').directive('ngEditableSelect', editableSelect);

  function editableSelect() {
    return {
      template: [
        '<span class="editable-wrapper">',
        '<span data-ng-hide="edit" data-ng-click="edit=true;value=model;">',
        '<span>{{model}}</span>',
        '</span>',
        '<select data-ng-model="value" data-ng-show="edit" data-ng-multiple="true" data-ng-options="option for option in options" data-ng-change="model=value;edit=false;">',
        '</select>',
        '</span>'].join(''),
      scope: {
        text: '&ngEditableSelectText',
        model: '=ngEditableSelectModel',
        options: '=ngEditableSelectOptions',
        update: '&ngEditableSelect'
      },
      transclude: true,
      replace: true,
      link: editableSelectLink
    };
  }

  function editableSelectLink(scope, element, attrs) {
    scope.$watch('edit', onEdit);

    function onEdit(isEditable) {
      if (isEditable === false) {
        scope.update();
      }
    }
  }

})(window, window.angular);