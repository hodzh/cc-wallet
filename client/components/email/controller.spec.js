'use strict';

describe('Controller: EmailInputController', function() {

  // load the controller's module
  beforeEach(module('walleApp.ui'));

  var EmailInputController;
  var scope;

  // Initialize the controller and a mock $window
  beforeEach(inject(function($rootScope, $controller) {
    scope = $rootScope.$new();
    EmailInputController = $controller('EmailInputController', {
      $scope: scope
    });
  }));

  it('should attach emailInputController', function() {
    expect(EmailInputController).toBeDefined();
  });
});
