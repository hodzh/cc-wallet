import { Component } from '@angular/core';

import { GridComponent } from '../../../../core/client/components/grid/grid.component';
import { ACCOUNT_LIST_SCHEMA } from './account-list-schema';
import { DataSource } from '../../../../core/client/common/data-source';
import { AccountResource } from './account.resource';
import { CurrencyDataSource } from '../currency/currency-data-source';

//const styles   = require('./account-list.component.scss');
const template = require('./account-list.component.html');

@Component({
  directives: [
    GridComponent
  ],
  template: template,
  //styles: [styles],
  providers:[AccountResource]
})
export class AccountListComponent {
  public schema = ACCOUNT_LIST_SCHEMA;
  public source: DataSource;
  constructor(
    resource: AccountResource,
    private currencySource: CurrencyDataSource
  ) {
    this.source = new DataSource(
      resource, {
        paginate: false,
        sortable: false
      });
  }
}
