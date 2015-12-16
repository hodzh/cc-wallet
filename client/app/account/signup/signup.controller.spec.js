'use strict';

describe('Controller: SignupController', function() {

  // load the controller's module
  beforeEach(module('walleApp'));
  beforeEach(module('app/account/signup/signup.html'));
  beforeEach(module('components/navbar/navbar.html'));
  beforeEach(module('components/oauth-buttons/oauth-buttons.html'));
  beforeEach(module('app/main/main.html'));

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

    templateHtml = $templateCache.get('app/account/signup/signup.html');
    controllerElement = angular.element(templateHtml);
    scope.vm = signupController;
    $compile(controllerElement)(scope);
    form = scope.form;
    formElement = controllerElement.find('form');

    scope.$apply();
  }));

  var validUser = {
    name: 'user name',
    email: 'test@test.email',
    password: 'password'
  };

  it('should validate user name and bind', function() {
    form.name.$setViewValue(validUser.name);
    expect(form.name.$valid).toBeTruthy();
    expect(signupController.user.name).toEqual(validUser.name);
  });

  it('should validate email and bind', function() {
    form.email.$setViewValue(validUser.email);
    expect(form.email.$valid).toBeTruthy();
    expect(signupController.user.email).toEqual(validUser.email);
  });

  it('should validate passwors and bind', function() {
    form.password.$setViewValue(validUser.password);
    expect(form.password.$valid).toBeTruthy();
    expect(signupController.user.password).toEqual(validUser.password);
  });

  it('should validate confirmPassword', function() {
    form.password.$setViewValue(validUser.password);
    form.confirmPassword.$setViewValue(validUser.password);
    expect(form.confirmPassword.$valid).toBeTruthy();
    form.confirmPassword.$setViewValue(validUser.password + 'x');
    expect(form.confirmPassword.$valid).toBeFalsy();
  });

  it('should register a valid user', function() {

    form.name.$setViewValue(validUser.name);
    form.email.$setViewValue(validUser.email);
    form.password.$setViewValue(validUser.password);
    form.confirmPassword.$setViewValue(validUser.password);

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