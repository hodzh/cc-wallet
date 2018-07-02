import { Component } from '@angular/core';
import { PageDataSource } from '../../common';
import { AdminUserResource } from './user.resource';
import { USER_LIST_SCHEMA } from './user-list-schema';
import { AdminUser } from './user';

//const styles   = require('./user-list.component.scss');
const template = require('./user-list.component.html');

@Component({
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
