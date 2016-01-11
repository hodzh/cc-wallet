'use strict';

describe('Controller: SignupController', function() {

  // load the controller's module
  beforeEach(module('walleApp'));
  beforeEach(module('components/navbar/index.html'));
  beforeEach(module('components/oauth-buttons/oauth-buttons.html'));
  beforeEach(module('components/email/index.html'));
  beforeEach(module('components/password/index.html'));
  beforeEach(module('modules/wallet/client/admin/accounts/index.html'));
  beforeEach(module('modules/wallet/client/user/accounts/index.html'));
  beforeEach(module('app/account/login/index.html'));
  beforeEach(module('app/account/signup/index.html'));
  beforeEach(module('app/main/index.html'));

  var scope, signupController, templateHtml, controllerElement, formElement, form;

  var auth = {
    createUser: function() {
      return {
        then: function(callback){
          callback();
          return this;
        },
        catch: function(callback){
          return this;
        }
      };
    }
  };

  var $state = jasmine.createSpyObj('$state', ['go']);

  // Initialize the controller and a mock $window
  beforeEach(inject(function($rootScope, $controller, $templateCache, $compile) {

    scope = $rootScope.$new();

    signupController = $controller('SignupController', {
      $scope: scope,
      $state: $state,
      Auth: auth
    });

    templateHtml = $templateCache.get('app/account/signup/index.html');
    controllerElement = angular.element(templateHtml);
    scope.vm = signupController;
    $compile(controllerElement)(scope);
    form = scope.form;
    formElement = controllerElement.find('form');
    scope.$apply();
  }));

  var validUser = {
    email: 'test@test.email',
    password: 'password'
  };

  it('should validate email and bind', function() {
    form.email.$setViewValue(validUser.email);
    expect(form.email.$valid).toBeTruthy();
    expect(signupController.user.email).toEqual(validUser.email);
  });

  it('should validate password and bind', function() {
    form.password.$setViewValue(validUser.password);
    expect(form.password.$valid).toBeTruthy();
    expect(signupController.user.password).toEqual(validUser.password);
  });

  it('should validate confirmPassword match password', function() {
    form.password.$setViewValue(validUser.password);
    form.confirmPassword.$setViewValue(validUser.password);
    expect(form.confirmPassword.$valid).toBeTruthy();
  });

  it('should validate confirmPassword not match password', function() {
    form.password.$setViewValue(validUser.password);
    form.confirmPassword.$setViewValue(validUser.password + 'x');
    expect(form.confirmPassword.$valid).toBeFalsy();
  });

  it('should register a valid user', function() {
    form.email.$setViewValue(validUser.email);
    form.password.$setViewValue(validUser.password);
    form.confirmPassword.$setViewValue(validUser.password);

    expect(form.email.$valid).toBeTruthy();
    expect(form.password.$valid).toBeTruthy();
    expect(form.confirmPassword.$valid).toBeTruthy();

    expect(form.$valid).toBeTruthy();

    spyOn(signupController, 'register').and.callThrough();
    spyOn(auth, 'createUser').and.callThrough();

    formElement.triggerHandler('submit');

    expect(signupController.register).toHaveBeenCalled();
    expect(signupController.submitted).toBeTruthy();

    expect(auth.createUser).toHaveBeenCalledWith(validUser);
    expect($state.go).toHaveBeenCalledWith('main');
  });
});