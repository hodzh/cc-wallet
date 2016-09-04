import { Component, ViewContainerRef } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';

const template = require('./app.html');

@Component({
  selector: 'walle-app',
  template: template,
  directives: [
    ROUTER_DIRECTIVES,
    NavbarComponent,
    FooterComponent
  ]
})
export class App {
  viewContainerRef;

  constructor(private privateviewContainerRef: ViewContainerRef) {
    this.viewContainerRef = privateviewContainerRef;
  }
}
