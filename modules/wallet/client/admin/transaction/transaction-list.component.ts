import { Component } from '@angular/core';

import { GridComponent } from '../../../../core/client/components/grid/grid.component';
import { TRANSACTION_LIST_SCHEMA } from './transaction-list-schema';
import { DataSource } from '../../../../core/client/common/data-source';
import { AdminTransactionResource } from './transaction.resource';

//const styles   = require('./transaction-list.component.scss');
const template = require('./transaction-list.component.html');

@Component({
  directives: [
    GridComponent
  ],
  template: template,
  //styles: [styles],
  providers: [AdminTransactionResource]
})
export class AdminTransactionListComponent {
  public schema = TRANSACTION_LIST_SCHEMA;
  public source: DataSource;
  constructor(
    resource: AdminTransactionResource
  ) {
    this.source = new DataSource(
      resource, {
        paginate: true,
        sortable: true
      });
  }
}
