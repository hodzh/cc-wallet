import { Component } from '@angular/core';
import { GridComponent } from '../../../../core/client/components/grid/grid.component';
import { DataSource } from '../../../../core/client/common/data-source';
import { AdminWithdrawalResource } from './withdrawal.resource.ts';
import { WITHDRAWAL_LIST_SCHEMA } from './withdrawal-list-schema';

//const styles   = require('./withdrawal-list.component.scss');
const template = require('./withdrawal-list.component.html');

@Component({
  directives: [
    GridComponent
  ],
  template: template,
  //styles: [styles],
  providers: [AdminWithdrawalResource]
})
export class AdminWithdrawalListComponent {
  public schema = WITHDRAWAL_LIST_SCHEMA;
  public source: DataSource;

  constructor(resource: AdminWithdrawalResource) {
    this.source = new DataSource(
      resource, {
        paginate: true,
        sortable: true
      });
  }
}
