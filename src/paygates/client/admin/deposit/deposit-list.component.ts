import { Component } from '@angular/core';
import { PageDataSource } from '../../../../core/client/common/page-data-source';
import { AdminDepositResource } from './deposit.resource.ts';
import { DEPOSIT_LIST_SCHEMA } from './deposit-list-schema';
import { AdminDeposit } from './deposit';

//const styles   = require('./deposit-list.component.scss');
const template = require('./deposit-list.component.html');

@Component({
  template: template,
  //styles: [styles],
  providers: [AdminDepositResource]
})
export class AdminDepositListComponent {
  public schema = DEPOSIT_LIST_SCHEMA;
  public source: PageDataSource<AdminDeposit>;

  constructor(resource: AdminDepositResource) {
    this.source = new PageDataSource<AdminDeposit>(
      resource, {
        paginate: true,
        sortable: true
      });
  }
}
