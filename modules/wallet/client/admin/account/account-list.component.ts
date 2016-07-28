import { Component } from '@angular/core';

import { GridComponent } from '../../../../core/client/components/grid/grid.component';
import { ADMIN_ACCOUNT_LIST_SCHEMA } from './account-list-schema';
import { DataSource } from '../../../../core/client/common/data-source';
import { AdminAccountResource } from './account.resource';

//const styles   = require('./account-list.component.scss');
const template = require('./account-list.component.html');

@Component({
  directives: [
    GridComponent
  ],
  template: template,
  //styles: [styles],
  providers:[AdminAccountResource]
})
export class AdminAccountListComponent {
  public schema = ADMIN_ACCOUNT_LIST_SCHEMA;
  public source: DataSource;
  constructor(
    resource: AdminAccountResource
  ) {
    this.source = new DataSource(
      resource, {
        paginate: true,
        sortable: true
      });
  }
}
