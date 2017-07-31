import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { Auth } from '../../auth';
import { AbstractForm } from '../../common/abstract-form';

const template = require('./login-form.component.html');

@Component({
  selector: 'cc-login-form',
  template,
})
export class LoginFormComponent extends AbstractForm {

  constructor(
    builder: FormBuilder,
    public router: Router,
    public auth: Auth,
  ) {
    super();
    this.form = builder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      captcha: ['', Validators.required],
    });
  }

  onSubmit() {
    let params = this.form.value;
    return this.auth.signIn(params);
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
