import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { UserResource } from '../../auth/user.resource';
import { Auth } from '../../auth/auth';

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
    this.emailVerifySubscription = Observable
      .fromEvent(this.sendButton.nativeElement, 'click')
      .throttle(() =>
        Observable.timer(throttleIntervalMin * 60 * 1000))
      .do(() => {
        this.submitPending = true;
      })
      .flatMap(() =>
        this.userResource.emailVerify()
            .retryWhen(function (errors) {
              return errors.delay(2000);
            }))
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
