import { Component } from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';
import { FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PasswordInputComponent } from '../../components/password/password-input.component.ts';
import { EmailInputComponent } from '../../components/email/email-input.component.ts';
import { Auth } from '../../auth';
import { LoginFormComponent } from './login-form.component';

//const styles   = require('./login.scss');
const template = require('./login-modal.component.html');

@Component({
  directives: [
    LoginFormComponent
  ],
  template: template,
  //styles: [styles],
  providers: []
})
export class LoginModalComponent {

  constructor() {
  }
}
