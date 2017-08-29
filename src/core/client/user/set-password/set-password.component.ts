import {
  Component, OnDestroy,
  OnInit
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Auth } from '../../auth';
import { UserResource } from '../../auth/user.resource';
import {
  FormGroup, AbstractControl, FormBuilder,
  Validators
} from '@angular/forms';
import {
  InputValidators
} from '../../common/input-validators';
import { Subscription } from 'rxjs';
import { MIN_PASSWORD_LENGTH, MAX_PASSWORD_LENGTH } from '../../../common/validate';
import { AbstractForm } from '../../common/abstract-form';

const template = require('./set-password.component.html');

@Component({
  template,
  providers: []
})
export class SetPasswordComponent extends AbstractForm implements OnInit, OnDestroy {
  public token: AbstractControl;
  public newPassword: AbstractControl;
  public confirmPassword: AbstractControl;
  public MIN_PASSWORD_LENGTH: number = MIN_PASSWORD_LENGTH;
  public MAX_PASSWORD_LENGTH: number = MAX_PASSWORD_LENGTH;
  private routeSubscription: Subscription;

  constructor(builder: FormBuilder,
              public router: Router,
              public auth: Auth,
              private route: ActivatedRoute
  ) {
    super();
    this.form = builder.group({
      token: ['', Validators.required],
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

    this.token = this.form.controls['token'];
    this.newPassword = (<FormGroup>this.form
      .controls['matchingPassword'])
      .controls['newPassword'];
    this.confirmPassword = (<FormGroup>this.form
      .controls['matchingPassword'])
      .controls['confirmPassword'];
  }

  ngOnInit() {
    this.routeSubscription = this.route.queryParams.subscribe(params => {
      this.token.setValue(params['token']);
    });
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
  }

  onSubmit() {
    return this.auth.setPassword({
      token: this.token.value,
      password: this.newPassword.value
    });
  }
}
