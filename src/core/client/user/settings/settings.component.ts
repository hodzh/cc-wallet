import { Component } from '@angular/core';
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

//const styles   = require('./settings.component.scss');
const template = require('./settings.component.html');

@Component({
  template: template,
})
export class SettingsComponent extends AbstractForm {
  public password: AbstractControl;
  public newPassword: AbstractControl;
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
      password: ['', Validators.required],
      matchingPassword: builder.group({
        newPassword: ['', Validators.compose([
          Validators.required,
          Validators.minLength(this.MIN_PASSWORD_LENGTH),
          Validators.maxLength(this.MAX_PASSWORD_LENGTH),
        ])],
        confirmPassword: ['', Validators.required],
      }, {
        validator: InputValidators.areEqual,
      }),
    });

    this.password = this.form
      .controls['password'];
    this.newPassword = (<FormGroup>this.form
      .controls['matchingPassword'])
      .controls['newPassword'];
    this.confirmPassword = (<FormGroup>this.form
      .controls['matchingPassword'])
      .controls['confirmPassword'];
  }

  onSubmit() {
    return this.auth.changePassword({
      password: this.form.controls['password'].value,
      newPassword: this.newPassword.value,
    });
  }
}
