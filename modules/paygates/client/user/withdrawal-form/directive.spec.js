'use strict';

describe('Directive: withdrawal-form', function() {

  var element, parentScope, elementScope;

  beforeEach(module('walleApp.paygates.user'));
  beforeEach(module('modules/paygates/user/withdrawal-form/index.html'));

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
    copileDirective('<withdrawal-form ng-model="scopedEmail"></withdrawal-form>');
    expect(elementScope.value).toEqual(parentScope.scopedEmail);
    expect(element.html()).toContain(parentScope.scopedEmail);
  });
});
