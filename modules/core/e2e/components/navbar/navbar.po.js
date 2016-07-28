'use strict';

var NavbarComponent = function() {
  this.navbar = element(by.css('.navbar'));
  this.navbarHeader = this.navbar.element(by.css('.navbar-header'));
  this.navbarNav = this.navbar.element(by.css('#navbar-main .nav.navbar-nav:not(.navbar-right)'));
  this.navbarAccount = this.navbar.element(by.css('#navbar-main .nav.navbar-nav.navbar-right'));
  this.navbarAccountGreeting = this.navbarAccount.element(by.binding('currentUser.name'));
};

module.exports = new NavbarComponent();
