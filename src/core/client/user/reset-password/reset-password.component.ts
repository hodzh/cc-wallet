import { Component, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../../auth';
import { Observable, Subscription } from 'rxjs';
import { UserResource } from '../../auth/user.resource';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AbstractForm } from '../../common/abstract-form';

const template = require('./reset-password.component.html');

@Component({
  template,
  providers: []
})
export class ResetPasswordComponent extends AbstractForm implements AfterViewInit, OnDestroy {
  constructor(
    public router: Router,
    public auth: Auth,
    private userResource: UserResource,
    builder: FormBuilder,
  ) {
    super();
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

  onSubmit() {
    return this.userResource.resetPassword({
      email: this.form.value.email
    });
  }
}
