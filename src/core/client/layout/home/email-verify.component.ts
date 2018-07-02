import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { fromEvent, timer, Subscription } from 'rxjs';
import { UserResource } from '../../auth/user.resource';
import { Auth } from '../../auth';
import { throttle, flatMap, retryWhen, tap, delay } from 'rxjs/internal/operators';

//const styles = require('./email-verify.component.scss');
const template = require('./email-verify.component.html');

@Component({
  template: template,
  //styles: [ styles ]
})
export class EmailVerifyComponent {
  @ViewChild('sendButton') sendButton: ElementRef;
  private emailVerifySubscription: Subscription;
  private submitPending: boolean;
  private error;

  constructor(public router: Router,
              public auth: Auth,
              private userResource: UserResource) {
  }

  ngAfterViewInit() {
    const throttleIntervalMin: number = 10;
    this.emailVerifySubscription = fromEvent(this.sendButton.nativeElement, 'click').pipe(
      throttle(() =>
        timer(throttleIntervalMin * 60 * 1000)),
      tap(() => {
        this.submitPending = true;
      }),
      flatMap(() =>
        this.userResource.emailVerify().pipe(
          retryWhen(function (errors) {
            return errors.pipe(delay(2000));
          }))))
      .subscribe(
        (res) => {
          if (res.error) {
            this.error = res.error;
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
    this.emailVerifySubscription.unsubscribe();
  }
}
