import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PasswordInputComponent } from '../../components/password/password-input.component.ts';
import { EmailInputComponent } from '../../components/email/email-input.component.ts';
import { Auth } from '../../auth';
import { LoginFormComponent } from './login-form.component';

const template = require('./login-modal.component.html');

@Component({
  template: template
})
export class LoginModalComponent {

  constructor() {
  }
}
