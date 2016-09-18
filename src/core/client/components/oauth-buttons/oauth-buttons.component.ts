import { Component } from "@angular/core";

const styles = require('./oauth-buttons.component.scss');
const template = require('./oauth-buttons.component.html');

@Component({
  selector: 'cc-oauth-buttons',
  template,
  styles: [styles]
})

export class OauthButtonsComponent {

  constructor(//public auth:Auth
  ) {
  }

  loginOauth(provider) {
  }
}
