'use strict';

var OauthButtons = function () {
  var oauthButtons = this.oauthButtons = element(by.css('oauth-buttons'));
  oauthButtons.facebook = oauthButtons.element(by.css('.btn.btn-social.btn-facebook'));
  oauthButtons.google = oauthButtons.element(by.css('.btn.btn-social.btn-google'));
  oauthButtons.twitter = oauthButtons.element(by.css('.btn.btn-social.btn-twitter'));
};

module.exports = new OauthButtons();
