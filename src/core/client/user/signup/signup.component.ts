import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Auth } from '../../auth';
import { InputValidators } from '../../common/input-validators';
import {
  MAX_PASSWORD_LENGTH,
  MIN_PASSWORD_LENGTH,
} from '../../../common/validate';
import { AbstractForm } from '../../common/abstract-form';
import { ReCaptchaComponent } from '../../components/recaptcha/recaptcha.component';

//const styles   = require('./signup.component.scss');
const template = require('./signup.component.html');

@Component({
  template: template,
  //styles: [styles],
  providers: [],
})
export class SignupComponent extends AbstractForm {
  @ViewChild('recaptcha')
  private recaptchaComponent: ReCaptchaComponent;
  public password: AbstractControl;
  public confirmPassword: AbstractControl;
  public MIN_PASSWORD_LENGTH: number = MIN_PASSWORD_LENGTH;
  public MAX_PASSWORD_LENGTH: number = MAX_PASSWORD_LENGTH;

  constructor(
    builder: FormBuilder,
    public router: Router,
    public auth: Auth,
  ) {
    super();
    this.form = builder.group({
      email: ['', Validators.compose([
        Validators.required,
        InputValidators.emailFormat])],
      matchingPassword: builder.group({
        password: ['', Validators.compose([
          Validators.required,
          Validators.minLength(this.MIN_PASSWORD_LENGTH),
          Validators.maxLength(this.MAX_PASSWORD_LENGTH),
        ])],
        confirmPassword: ['', Validators.required],
      }, {
        validator: InputValidators.areEqual,
      }),
      captcha: ['', Validators.required],
    });

    this.password = (<FormGroup>this.form
      .controls['matchingPassword'])
      .controls['password'];
    this.confirmPassword = (<FormGroup>this.form
      .controls['matchingPassword'])
      .controls['confirmPassword'];
  }

  onSubmit() {
    return this.auth.signUp({
      email: this.form.controls['email'].value,
      password: this.password.value,
      captcha: this.form.value.captcha,
    });
  }

  onError(error) {
    super.onError(error);
    this.recaptchaComponent.reset();
  }

  captchaResponse(captcha) {
    this.form.patchValue({captcha: captcha});
  }

  captchaExpired() {
    this.form.patchValue({captcha: null});
  }
}
