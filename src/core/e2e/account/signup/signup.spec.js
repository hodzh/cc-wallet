'use strict';

var config = browser.params;
var UserModel = require(config.serverConfig.root + '/server/model/user');

describe('Signup View', function () {
  var page;

  var loadPage = function () {
    browser.manage().deleteAllCookies();
    browser.get(config.baseUrl + '/signUp');
    page = require('./signup.po');
  };

  var testUser = {
    name: 'Test',
    email: 'test@example.com',
    password: 'test',
    confirmPassword: 'test'
  };

  beforeEach(function () {
    loadPage();
  });

  it('should include signUp form with correct inputs and submit button', function () {
    expect(page.form.name.getAttribute('type')).toBe('text');
    expect(page.form.name.getAttribute('name')).toBe('name');
    expect(page.form.email.getAttribute('type')).toBe('email');
    expect(page.form.email.getAttribute('name')).toBe('email');
    expect(page.form.password.getAttribute('type')).toBe('password');
    expect(page.form.password.getAttribute('name')).toBe('password');
    expect(page.form.confirmPassword.getAttribute('type')).toBe('password');
    expect(page.form.confirmPassword.getAttribute('name')).toBe('confirmPassword');
    expect(page.form.submit.getAttribute('type')).toBe('submit');
    expect(page.form.submit.getText()).toBe('Sign up');
  });

  it('should include oauth buttons with correct classes applied', function () {
    expect(page.form.oauthButtons.facebook.getText()).toBe('Connect with Facebook');
    expect(page.form.oauthButtons.facebook.getAttribute('class')).toMatch('btn-block');
    expect(page.form.oauthButtons.google.getText()).toBe('Connect with Google+');
    expect(page.form.oauthButtons.google.getAttribute('class')).toMatch('btn-block');
    expect(page.form.oauthButtons.twitter.getText()).toBe('Connect with Twitter');
    expect(page.form.oauthButtons.twitter.getAttribute('class')).toMatch('btn-block');
  });

  describe('with local auth', function () {

    beforeAll(function (done) {
      UserModel.remove().then(done);
    });

    it('should signUp a new user, log them in, and redirecting to "/"', function () {
      page.signUp(testUser);

      var navbar = require('../../components/navbar/navbar.po');

      expect(browser.getCurrentUrl()).toBe(config.baseUrl + '/');
      expect(navbar.navbarAccountGreeting.getText()).toBe('Hello ' + testUser.name);
    });

    it('should indicate signUp failures', function () {
      page.signUp(testUser);

      expect(browser.getCurrentUrl()).toBe(config.baseUrl + '/signUp');
      expect(page.form.email.getAttribute('class')).toContain('ng-invalid-mongoose');

      var helpBlock = page.form.element(by.css('.form-group.has-error .help-block.ng-binding'));
      expect(helpBlock.getText()).toBe('The specified email address is already in use.');
    });

  });
});
