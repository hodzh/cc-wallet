'use strict';

var config = browser.params;
var UserModel = require(config.serverConfig.root + '/server/model/user');

describe('Logout View', function () {

  var page;

  var loadPage = function () {
    var url = config.baseUrl + '/signIn';
    console.log('navigate to', url);
    page = require('../login/login.po');
    return browser.get(url);
  };

  var testUser = {
    name: 'Test User',
    email: 'test@example.com',
    password: 'test'
  };

  var login = function () {
    page.signIn(testUser);
  };

  beforeEach(function (done) {
    UserModel.remove()
      .then(function () {
        return UserModel.create(testUser);
      })
      .then(function () {
        return loadPage();
      })
      .finally(done);
  });

  describe('with local auth', function () {

    it('should signOut a user and redirecting to "/"', function () {

      login();

      var navbar = require('../../components/navbar/navbar.po');

      expect(browser.getCurrentUrl()).toBe(config.baseUrl + '/');
      expect(navbar.navbarAccountGreeting.getText()).toBe('Hello ' + testUser.name);

      browser.get(config.baseUrl + '/signOut');

      navbar = require('../../components/navbar/navbar.po');

      expect(browser.getCurrentUrl()).toBe(config.baseUrl + '/');
      expect(navbar.navbarAccountGreeting.isDisplayed()).toBe(false);
    });

  });
});
