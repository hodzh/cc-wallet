import { Component, ViewChild, ElementRef, AfterViewInit, Input } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder } from "@angular/forms";
import { Auth } from "../../auth";
import { Observable } from "rxjs";
import { UserResource } from "../../auth/user.resource";

const template = require('./reset-password.component.html');

@Component({
  template,
  providers: []
})
export class ResetPasswordComponent implements AfterViewInit {
  @ViewChild('resetButton') resetButton: ElementRef;
  public submitPending: boolean = false;
  private resetPassword$;
  errors;
  @Input() email;

  constructor(builder: FormBuilder,
              public router: Router,
              public auth: Auth,
              private userResource: UserResource) {
  }

  ngAfterViewInit() {
    const throttleIntervalMin: number = 1;
    this.resetPassword$ = Observable
      .fromEvent(this.resetButton.nativeElement, 'click')
      .merge(Observable.of(true))
      .throttle(() => Observable.timer(throttleIntervalMin * 60 * 1000))
      .do(() => {
        this.submitPending = true;
      })
      .flatMap(() => this.userResource.resetPassword({email: this.email}))
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

  displayErrors(error) {
    if (error.messages) {
      var messages = error.messages;
      messages.forEach((message) => {
      });
    } else {
      this.errors = `${error.reasonPhrase} (${error.code})`;
    }
  }
}
