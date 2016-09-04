import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from '@angular/common';

const styles = require('./oauth-buttons.component.scss');
const template = require('./oauth-buttons.component.html');

@Component({
  selector: 'cc-oauth-buttons',
  template: template,
  styles: [styles],
  directives: [
    ROUTER_DIRECTIVES,
    CORE_DIRECTIVES,
    FORM_DIRECTIVES
  ],
})

export class OauthButtonsComponent {

  constructor(//public auth:Auth
  ) {
  }

  loginOauth(provider) {
    //$window.location.href = '/auth/' + provider;
  }
}
