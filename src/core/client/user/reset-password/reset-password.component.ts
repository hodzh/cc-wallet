import { Component, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../../auth';
import { Observable, Subscription } from 'rxjs';
import { UserResource } from '../../auth/user.resource';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

const template = require('./reset-password.component.html');

@Component({
  template,
  providers: []
})
export class ResetPasswordComponent implements AfterViewInit, OnDestroy {
  public form: FormGroup;
  public submitted: boolean = false;
  public submitPending: boolean = false;
  public errors: string;

  constructor(
    public router: Router,
    public auth: Auth,
    private userResource: UserResource,
    builder: FormBuilder,
  ) {
    this.form = builder.group({
      email: ['', Validators.required],
    });
    //this.form.controls.email.setValue(this.auth.currentUser.email);
  }

  ngAfterViewInit() {
  }

  ngOnDestroy() {
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

  resetPassword() {
    if (this.submitPending) {
      // already submitted
      return;
    }
    this.submitted = true;
    if (!this.form.valid) {
      return;
    }
    this.submitPending = true;
    this.userResource.resetPassword({
      email: this.form.value.email
    })
      .subscribe(
        () => {
          this.submitPending = false;
          this.router.navigate(['/reset-password-done']);
        },
        (error) => {
          try {
            this.displayErrors(error.json());
          } catch (errorParse) {
            this.displayErrors({message: error.status});
          }
          this.submitPending = false;
        }
      );
  }

  shouldDisplaySubmitProgress() {
    return this.submitPending || this.form.pending;
  }

  shouldDisableSubmitButton(): boolean {
    return false && (!this.form.valid ||
      this.form.pending ||
      this.submitPending);
  }
}
