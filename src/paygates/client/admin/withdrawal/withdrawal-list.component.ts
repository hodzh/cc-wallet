import { Component } from '@angular/core';
import { PageTableComponent } from '../../../../core/client/components/grid/page-table.component.ts';
import { PageDataSource } from '../../../../core/client/common/page-data-source';
import { AdminWithdrawalResource } from './withdrawal.resource.ts';
import { WITHDRAWAL_LIST_SCHEMA } from './withdrawal-list-schema';
import { AdminWithdrawal } from './withdrawal';

//const styles   = require('./withdrawal-list.component.scss');
const template = require('./withdrawal-list.component.html');

@Component({
  directives: [
    PageTableComponent
  ],
  template: template,
  //styles: [styles],
  providers: [AdminWithdrawalResource]
})
export class AdminWithdrawalListComponent {
  public schema = WITHDRAWAL_LIST_SCHEMA;
  public source: PageDataSource<AdminWithdrawal>;

  constructor(resource: AdminWithdrawalResource) {
    this.source = new PageDataSource<AdminWithdrawal>(
      resource, {
        paginate: true,
        sortable: true
      });
  }
}
