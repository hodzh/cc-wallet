import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

//const styles   = require('./statistics.component.scss');
const template = require('./statistics.component.html');

@Component({
  directives: [
    ROUTER_DIRECTIVES
  ],
  template: template,
  //styles: [styles],
  providers: []
})
export class StatisticsComponent {

  constructor() {
  }
}
