import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { PageTableComponent } from '../../components/grid/page-table.component.ts';
import { PageDataSource } from '../../common/page-data-source';
import { AdminUserResource } from './user.resource';
import { USER_LIST_SCHEMA } from './user-list-schema';
import { AdminUser } from './user';

//const styles   = require('./user-list.component.scss');
const template = require('./user-list.component.html');

@Component({
  directives: [
    ROUTER_DIRECTIVES,
    PageTableComponent
  ],
  template: template,
  //styles: [styles],
  providers: [AdminUserResource]
})
export class AdminUsersComponent {
  public schema = USER_LIST_SCHEMA;
  public source: PageDataSource<AdminUser>;

  constructor(resource: AdminUserResource) {
    this.source = new PageDataSource<AdminUser>(
      resource, {
        paginate: true,
        sortable: true
      });
  }
}
