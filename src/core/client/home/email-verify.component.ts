import { Component } from "@angular/core";
import { Router } from "@angular/router";

//const styles = require('./email-verify.component.scss');
const template = require('./email-verify.component.html');

@Component({
  template: template,
  //styles: [ styles ]
})
export class EmailVerifyComponent {

  constructor(public router: Router) {
  }
}
