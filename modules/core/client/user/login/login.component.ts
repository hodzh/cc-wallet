import {
  Component
} from '@angular/core';

import {
  Router,
  ROUTER_DIRECTIVES
} from '@angular/router';

import {
  FORM_DIRECTIVES,
  REACTIVE_FORM_DIRECTIVES,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';

import { PasswordInputComponent } from '../../components/password/password-input.component.ts';
import { EmailInputComponent } from '../../components/email/email-input.component.ts';
import { Auth } from '../../auth';
import { InputValidators } from '../../common/input-validators';
import { logInfo } from 'typings/dist/support/cli';

//const styles   = require('./login.scss');
const template = require('./login.component.html');

@Component({
  directives: [
    FORM_DIRECTIVES,
    REACTIVE_FORM_DIRECTIVES,
    ROUTER_DIRECTIVES,
    EmailInputComponent,
    PasswordInputComponent
  ],
  template: template,
  //styles: [styles],
  providers: []
})
export class LoginComponent {
  public errors = '';
  public loginForm: FormGroup;
  public submitted: boolean = false;
  public submitPending: boolean = false;

  constructor(builder: FormBuilder,
              public router: Router,
              public auth: Auth) {
    this.loginForm = builder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    if (this.submitPending) {
      // already submitted
      return;
    }
    this.submitted = true;
    if (!this.loginForm.valid) {
      return;
    }
    this.submitPending = true;
    this.auth.login(this.loginForm.value)
      .subscribe(
        () => {
          this.submitPending = false;
        },
        (error) => {
          this.displayErrors(error);
          this.submitPending = false;
        }
      );
  }

  signup(event) {
    event.preventDefault();
    this.router.navigate(['/signup']);
  }

  resetPassword(event) {
    event.preventDefault();
    this.router.navigate(['/password/reset']);
  }

  clearErrors() {
    this.errors = '';
  }

  shouldDisableSubmitButton(): boolean {
    // todo
    return false && (!this.loginForm.valid ||
      this.loginForm.pending ||
      this.submitPending);
  }

  shouldDisplaySubmitProgress() {
    return this.submitPending || this.loginForm.pending;
  }

  displayErrors(error) {
    if (error.messages) {
      var messages = error.messages;
      messages.forEach((message) => {
        /*this.loginForm.controls[message.property]
         .setErrors({
         remote: message.message
         });*/
      });
    } else {
      this.errors = `${error.reasonPhrase} (${error.code})`;
    }
  }
}
