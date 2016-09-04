import { Component } from '@angular/core';
import { PageTableComponent } from '../../../../core/client/components/grid/page-table.component.ts';
import { ADMIN_ACCOUNT_LIST_SCHEMA } from './account-list-schema';
import { AdminAccountDataSource } from './account-data-source';

//const styles   = require('./account-list.component.scss');
const template = require('./account-list.component.html');

@Component({
  directives: [
    PageTableComponent
  ],
  template: template,
  //styles: [styles],
  providers: [AdminAccountDataSource]
})
export class AdminAccountListComponent {
  public schema = ADMIN_ACCOUNT_LIST_SCHEMA;

  constructor(public source: AdminAccountDataSource) {
  }
}
