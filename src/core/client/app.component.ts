import { Component, ViewContainerRef } from '@angular/core';

const template = require('./app.component.html');

@Component({
  selector: 'walle-app',
  template: template
})
export class AppComponent {
  viewContainerRef;

  constructor(private privateviewContainerRef: ViewContainerRef) {
    this.viewContainerRef = privateviewContainerRef;
  }
}
