import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Auth } from '../../auth';
import { InputValidators, MIN_PASSWORD_LENGTH, MAX_PASSWORD_LENGTH } from '../../common/input-validators';

//const styles   = require('./signup.component.scss');
const template = require('./signup.component.html');

@Component({
  template: template,
  //styles: [styles],
  providers: []
})
export class SignupComponent {
  public errors = '';
  public signupForm: FormGroup;
  public password: AbstractControl;
  public confirmPassword: AbstractControl;
  public submitted: boolean = false;
  public submitPending: boolean = false;
  public MIN_PASSWORD_LENGTH: number = MIN_PASSWORD_LENGTH;
  public MAX_PASSWORD_LENGTH: number = MAX_PASSWORD_LENGTH;

  constructor(builder: FormBuilder,
              public router: Router,
              public auth: Auth) {
    this.signupForm = builder.group({
      email: ['', Validators.compose([
        Validators.required,
        InputValidators.emailFormat])],
      matchingPassword: builder.group({
        password: ['', Validators.compose([
          Validators.required,
          Validators.minLength(this.MIN_PASSWORD_LENGTH),
          Validators.maxLength(this.MAX_PASSWORD_LENGTH)
        ])],
        confirmPassword: ['', Validators.required]
      }, {
        validator: InputValidators.areEqual
      }),
      captcha: ['', Validators.required]
    });

    this.password = (<FormGroup>this.signupForm
      .controls['matchingPassword'])
      .controls['password'];
    this.confirmPassword = (<FormGroup>this.signupForm
      .controls['matchingPassword'])
      .controls['confirmPassword'];
  }

  signup() {
    if (this.submitPending) {
      // already submitted
      return;
    }
    this.submitted = true;
    if (!this.signupForm.valid) {
      return;
    }
    this.submitPending = true;
    this.auth.signup({
      email: this.signupForm.controls['email'].value,
      password: this.password.value,
      captcha: this.signupForm.value.captcha
    })
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

  captchaResponse(captcha) {
    this.signupForm.patchValue({captcha: captcha});
  }

  captchaExpired() {
    this.signupForm.patchValue({captcha: null});
  }
}
