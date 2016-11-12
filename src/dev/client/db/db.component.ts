import { Component } from '@angular/core';
import { DbResource } from './db.resource';

const template = require('./db.component.html');

@Component({
  template: template,
  providers: [
    DbResource
  ]
})
export class DevDbComponent {

  constructor(private dbResource: DbResource) {
  }

  clearAll() {
    this.dbResource.clearAll()
        .subscribe(()=> {
        });
  }

  addUsers() {
    this.dbResource.addUsers()
        .subscribe(()=> {
        });
  }
}
