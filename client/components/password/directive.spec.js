'use strict';

describe('Directive: password-input', function() {

  var element, parentScope, elementScope;

  beforeEach(module('walleApp.ui'));
  beforeEach(module('components/password/index.html'));

  beforeEach(inject(function($rootScope) {
    parentScope = $rootScope.$new();
  }));

  function copileDirective(template) {
    inject(function ($rootScope, $compile) {
      element = angular.element(template);
      element = $compile(element)(parentScope);
      parentScope.$digest();
      elementScope = element.isolateScope();
    });
  }

  it('should evaluate and bind the classes attribute to scope.value', function() {
    parentScope.scopedPassword = 'password';
    copileDirective('<password-input ng-model="scopedPassword"></password-input>');
    expect(elementScope.value).toEqual(parentScope.scopedPassword);
  });
});
