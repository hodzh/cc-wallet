import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Auth } from '../../auth';
import { InputValidators, MIN_PASSWORD_LENGTH, MAX_PASSWORD_LENGTH } from '../../common/input-validators';

//const styles   = require('./settings.component.scss');
const template = require('./settings.component.html');

@Component({
  template: template
})
export class SettingsComponent {
  public settingsForm: FormGroup;
  public password: AbstractControl;
  public newPassword: AbstractControl;
  public confirmPassword: AbstractControl;
  public submitted: boolean = false;
  public submitPending: boolean = false;
  public MIN_PASSWORD_LENGTH: number = MIN_PASSWORD_LENGTH;
  public MAX_PASSWORD_LENGTH: number = MAX_PASSWORD_LENGTH;

  constructor(builder: FormBuilder,
              public router: Router,
              public auth: Auth) {
    this.settingsForm = builder.group({
      password: ['', Validators.required],
      matchingPassword: builder.group({
        newPassword: ['', Validators.compose([
          Validators.required,
          Validators.minLength(this.MIN_PASSWORD_LENGTH),
          Validators.maxLength(this.MAX_PASSWORD_LENGTH)
        ])],
        confirmPassword: ['', Validators.required]
      }, {
        validator: InputValidators.areEqual
      })
    });

    this.password = this.settingsForm
      .controls['password'];
    this.newPassword = (<FormGroup>this.settingsForm
      .controls['matchingPassword'])
      .controls['newPassword'];
    this.confirmPassword = (<FormGroup>this.settingsForm
      .controls['matchingPassword'])
      .controls['confirmPassword'];
  }

  changePassword() {
    if (this.submitPending) {
      // already submitted
      return;
    }
    this.submitted = true;
    if (!this.settingsForm.valid) {
      return;
    }
    this.submitPending = true;
    this.auth.changePassword({
      password: this.settingsForm.controls['password'].value,
      newPassword: this.newPassword.value
    })
      .subscribe(
        () => {
          this.submitPending = false;
        },
        (error) => {
          //this.settingsForm(error);
          this.submitPending = false;
        }
      );
  }
}
