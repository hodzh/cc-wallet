import { Component } from '@angular/core';
import { Router } from '@angular/router';

//const styles = require('./guest.component.scss');
const template = require('./guest.component.html');

@Component({
  template: template,
  //styles: [ styles ]
})
export class GuestHome {

  constructor(public router: Router) {
  }
}
