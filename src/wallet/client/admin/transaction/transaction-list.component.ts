import { Component } from '@angular/core';
import { PageTableComponent } from '../../../../core/client/components/grid/page-table.component.ts';
import { TRANSACTION_LIST_SCHEMA } from './transaction-list-schema';
import { PageDataSource } from '../../../../core/client/common/page-data-source';
import { AdminTransactionResource } from './transaction.resource';
import { Transaction } from './transaction';

//const styles   = require('./transaction-list.component.scss');
const template = require('./transaction-list.component.html');

@Component({
  template: template,
  //styles: [styles],
  providers: [AdminTransactionResource]
})
export class AdminTransactionListComponent {
  public schema = TRANSACTION_LIST_SCHEMA;
  public source: PageDataSource<Transaction>;

  constructor(resource: AdminTransactionResource) {
    this.source = new PageDataSource<Transaction>(
      resource, {
        paginate: true,
        sortable: true
      });
  }
}
