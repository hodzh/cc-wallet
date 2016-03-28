'use strict';

describe('Controller: WithdrawalFormController', function() {

  // load the controller's module
  beforeEach(module('walleApp.paygates.user'));

  var WithdrawalFormController;
  var scope;

  // Initialize the controller and a mock $window
  beforeEach(inject(function($rootScope, $controller, UserWithdrawal) {
    scope = $rootScope.$new();
    WithdrawalFormController = $controller('WithdrawalFormController', {
      $scope: scope,
      UserWithdrawal: UserWithdrawal
    });
  }));

  it('should attach WithdrawalFormController', function() {
    expect(WithdrawalFormController).toBeDefined();
  });
});
