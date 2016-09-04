import { Component } from '@angular/core';
import { PageTableComponent } from '../../../../core/client/components/grid/page-table.component.ts';
import { ACCOUNT_LIST_SCHEMA } from './account-list-schema';
import { AllAccountDataSource } from './all-account.data-source';
import { BehaviorSubject, Observable } from 'rxjs';
import { FilteredAccountDataSource } from './filtered-account.data-source';
import { AccountFilterComponent } from './account-filter.component';

const styles   = require('./account-list.component.scss');
const template = require('./account-list.component.html');

@Component({
  directives: [
    PageTableComponent,
    AccountFilterComponent
  ],
  template,
  styles: [styles],
  providers: [FilteredAccountDataSource]
})
export class AccountListComponent {
  public schema = ACCOUNT_LIST_SCHEMA;
  public source: FilteredAccountDataSource;

  constructor(private source: FilteredAccountDataSource) {
    source.read();
  }
}
