import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Auth } from '../../auth';
import { ReCaptchaComponent } from '../../components/recaptcha/recaptcha.component';

const template = require('./login-form.component.html');

@Component({
  selector: 'cc-login-form',
  template
})
export class LoginFormComponent {
  public errors = '';
  public loginForm: FormGroup;
  public submitted: boolean = false;
  public submitPending: boolean = false;
  @ViewChild('recaptcha')
  private recaptchaComponent: ReCaptchaComponent;

  constructor(builder: FormBuilder,
              public router: Router,
              public auth: Auth) {
    this.loginForm = builder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      captcha: ['', Validators.required]
    });
  }

  signIn() {
    if (this.submitPending) {
      // already submitted
      return;
    }
    this.submitted = true;
    if (!this.loginForm.valid) {
      return;
    }
    this.submitPending = true;
    let params = this.loginForm.value;
    this.auth.signIn(params)
      .subscribe(
        () => {
          this.submitPending = false;
        },
        (error) => {
          if (error && error.json) {
            this.displayErrors(error.json());
          }
          this.submitPending = false;
          this.recaptchaComponent.reset();
        }
      );
  }

  signUp(event) {
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
    if (!error) {
      return;
    }
    if (error.messages) {
      let messages = error.messages;
      messages.forEach((message) => {
        /*this.loginForm.controls[message.property]
         .setErrors({
         remote: message.message
         });*/
      });
    } else if (error.message) {
      this.errors = `${error.message}`;
    }
  }

  captchaResponse(captcha) {
    this.loginForm.patchValue({captcha: captcha});
  }

  captchaExpired() {
    this.loginForm.patchValue({captcha: null});
  }
}
