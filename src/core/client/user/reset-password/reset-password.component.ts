import { Component, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../../auth';
import { Observable, Subscription } from 'rxjs';
import { UserResource } from '../../auth/user.resource';

const template = require('./reset-password.component.html');

@Component({
  template,
  providers: []
})
export class ResetPasswordComponent implements AfterViewInit, OnDestroy {
  @ViewChild('resetButton') resetButton: ElementRef;
  public submitPending: boolean = false;
  public errors: string;
  private resetPasswordSubscription: Subscription;

  constructor(public router: Router,
              public auth: Auth,
              private userResource: UserResource) {
  }

  ngAfterViewInit() {
    const throttleIntervalMin: number = 60;
    this.resetPasswordSubscription = Observable
      .fromEvent(this.resetButton.nativeElement, 'click')
      .throttle(() =>
        Observable.timer(throttleIntervalMin * 60 * 1000))
      .do(() => {
        this.submitPending = true;
      })
      .flatMap(() =>
        this.userResource.resetPassword({
          email: this.auth.currentUser.email
        })
      )
      .subscribe(
        (res) => {
          if (res.error) {
            this.displayErrors(res.error);
          }
        },
        (err) => {
          console.error(err);
        },
        () => {
          this.submitPending = false;
        });
  }

  ngOnDestroy() {
    this.resetPasswordSubscription.unsubscribe();
  }

  displayErrors(error) {
    if (error.messages) {
      let messages = error.messages;
      messages.forEach((message) => {
      });
    } else {
      this.errors = `${error.message}`;
    }
  }

  login() {
    this.router.navigate(['/signin']);
  }
}
