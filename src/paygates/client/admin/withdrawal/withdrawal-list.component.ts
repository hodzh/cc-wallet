import { Component } from '@angular/core';
import { PageDataSource } from '../../../../core/client/common/page-data-source';
import { AdminWithdrawalResource } from './withdrawal.resource.ts';
import { WITHDRAWAL_LIST_SCHEMA } from './withdrawal-list-schema';
import { AdminWithdrawal } from './withdrawal';
import { TableSchema } from '../../../../core/client/components/grid/table-scheme';

//const styles   = require('./withdrawal-list.component.scss');
const template = require('./withdrawal-list.component.html');

@Component({
  template: template,
  //styles: [styles],
  providers: [AdminWithdrawalResource]
})
export class AdminWithdrawalListComponent {
  public schema: TableSchema = WITHDRAWAL_LIST_SCHEMA;
  public source: PageDataSource<AdminWithdrawal>;

  constructor(resource: AdminWithdrawalResource) {
    this.source = new PageDataSource<AdminWithdrawal>(
      resource, {
        paginate: true,
        sortable: true
      });
  }
}
