'use strict';

describe('Directive: email-input', function() {

  var element, parentScope, elementScope;

  beforeEach(module('walleApp.ui'));
  beforeEach(module('modules/core/client/components/email/index.html'));

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
    parentScope.scopedEmail = 'email';
    copileDirective('<email-input ng-model="scopedEmail"></email-input>');
    expect(elementScope.value).toEqual(parentScope.scopedEmail);
    expect(element.html()).toContain(parentScope.scopedEmail);
  });
});
