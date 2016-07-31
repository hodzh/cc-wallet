import { Component } from '@angular/core';
import {
  Router,
  ROUTER_DIRECTIVES
} from '@angular/router';

import { GridComponent } from '../../../../core/client/components/grid/grid.component';
import { DataSource } from '../../../../core/client/common/data-source';
import { AdminDepositResource } from './deposit.resource.ts';
import { DEPOSIT_LIST_SCHEMA } from './deposit-list-schema';

//const styles   = require('./deposit-list.component.scss');
const template = require('./deposit-list.component.html');

@Component({
  directives: [
    GridComponent
  ],
  template: template,
  //styles: [styles],
  providers: [AdminDepositResource]
})
export class AdminDepositListComponent {
  public schema = DEPOSIT_LIST_SCHEMA;
  public source: DataSource;

  constructor(resource: AdminDepositResource) {
    this.source = new DataSource(
      resource, {
        paginate: true,
        sortable: true
      });
  }
}
