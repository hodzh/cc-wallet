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
  InputValidators, MIN_PASSWORD_LENGTH,
  MAX_PASSWORD_LENGTH
} from '../../common/input-validators';
import { Subscription } from 'rxjs';


const template = require('./set-password.component.html');

@Component({
  template,
  providers: []
})
export class SetPasswordComponent implements OnInit, OnDestroy{
  public settingsForm: FormGroup;
  public token: AbstractControl;
  public newPassword: AbstractControl;
  public confirmPassword: AbstractControl;
  public submitted: boolean = false;
  public submitPending: boolean = false;
  public MIN_PASSWORD_LENGTH: number = MIN_PASSWORD_LENGTH;
  public MAX_PASSWORD_LENGTH: number = MAX_PASSWORD_LENGTH;
  private routeSubscription: Subscription;

  constructor(builder: FormBuilder,
              public router: Router,
              public auth: Auth,
              private route: ActivatedRoute
  ) {
    this.settingsForm = builder.group({
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

    this.token = this.settingsForm.controls['token'];
    this.newPassword = (<FormGroup>this.settingsForm
      .controls['matchingPassword'])
      .controls['newPassword'];
    this.confirmPassword = (<FormGroup>this.settingsForm
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
    this.auth.setPassword({
      token: this.token.value,
      password: this.newPassword.value
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
