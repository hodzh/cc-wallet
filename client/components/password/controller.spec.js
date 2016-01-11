'use strict';

describe('Controller: PasswordInputController', function() {

  // load the controller's module
  beforeEach(module('walleApp.ui'));

  var PasswordInputController;
  var scope;

  // Initialize the controller and a mock $window
  beforeEach(inject(function($rootScope, $controller) {
    scope = $rootScope.$new();
    PasswordInputController = $controller('PasswordInputController', {
      $scope: scope
    });
  }));

  it('should attach PasswordInputController', function() {
    expect(PasswordInputController).toBeDefined();
    expect(PasswordInputController.togglePasswordVisible).toEqual(jasmine.any(Function));
  });
});
