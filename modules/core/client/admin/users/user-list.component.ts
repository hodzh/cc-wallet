import { Component } from '@angular/core';
import {
  Router,
  ROUTER_DIRECTIVES
} from '@angular/router';

import { GridComponent } from '../../components/grid/grid.component.ts';
import { DataSource } from '../../common/data-source';
import { AdminUserResource } from './user.resource';
import { USER_LIST_SCHEMA } from './user-list-schema';

//const styles   = require('./user-list.component.scss');
const template = require('./user-list.component.html');

@Component({
  directives: [
    ROUTER_DIRECTIVES,
    GridComponent
  ],
  template: template,
  //styles: [styles],
  providers: [AdminUserResource]
})
export class AdminUsersComponent {
  public schema = USER_LIST_SCHEMA;
  public source: DataSource;

  constructor(resource: AdminUserResource) {
    this.source = new DataSource(
      resource, {
        paginate: true,
        sortable: true
      });
  }
}
