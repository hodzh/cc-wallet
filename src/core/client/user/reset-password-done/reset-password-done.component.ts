import { Component, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../../auth';
import { fromEvent, Subscription, timer } from 'rxjs';
import { UserResource } from '../../auth/user.resource';
import { tap, flatMap, throttle } from 'rxjs/operators';

const template = require('./reset-password-done.component.html');

@Component({
  template,
  providers: []
})
export class ResetPasswordDoneComponent implements AfterViewInit, OnDestroy {
  @ViewChild('resetButton') resetButton: ElementRef;
  public submitPending: boolean = false;
  public errors: string;
  private resetPasswordSubscription: Subscription;

  constructor(
    public router: Router,
    public auth: Auth,
    private userResource: UserResource
  ) {
  }

  ngAfterViewInit() {
    const throttleIntervalMin: number = 60;
    this.resetPasswordSubscription = fromEvent(this.resetButton.nativeElement, 'click').pipe(
      throttle(() =>
        timer(throttleIntervalMin * 60 * 1000)),
      tap(() => {
        this.submitPending = true;
      }),
      flatMap(() =>
        this.userResource.resetPassword({
          email: this.auth.currentUser.email
        })
      ))
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
        }
      );
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
