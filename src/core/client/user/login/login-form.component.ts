import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { Auth } from '../../auth';
import { AbstractForm } from '../../common/abstract-form';
import { ReCaptchaComponent } from '../../components/recaptcha/recaptcha.component';
import {loginForm, LoginForm} from './login-form';

const template = require('./login-form.component.html');

@Component({
  selector: 'cc-login-form',
  template,
})
export class LoginFormComponent extends AbstractForm {
  @ViewChild('recaptcha')
  private recaptchaComponent: ReCaptchaComponent;
  private config: LoginForm;

  constructor(
    builder: FormBuilder,
    public router: Router,
    public auth: Auth,
  ) {
    super();
    this.config = loginForm;
    let controlsConfig: any = {
      email: ['', Validators.required],
      password: ['', Validators.required],
    };
    if (this.config.recaptcha) {
      controlsConfig.captcha = ['', Validators.required];
    }
    this.form = builder.group(controlsConfig);
  }

  onSubmit() {
    let params = this.form.value;
    return this.auth.signIn(params);
  }

  onError(error) {
    super.onError(error);
    if (this.config.recaptcha) {
      this.recaptchaComponent.reset();
    }
  }

  signUp(event) {
    event.preventDefault();
    this.router.navigate(['/signup']);
  }

  resetPassword(event) {
    event.preventDefault();
    this.router.navigate(['/password/reset']);
  }

  captchaResponse(captcha) {
    this.form.patchValue({captcha: captcha});
  }

  captchaExpired() {
    this.form.patchValue({captcha: null});
  }
}
