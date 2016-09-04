import { Injectable } from '@angular/core';
import { Account } from './account';
import { DataSource } from '../../../../core/client/common/data-source';
import { AccountResource } from './account.resource';

@Injectable()
export class AccountDataSource extends DataSource<Account> {
  constructor(resource: AccountResource) {
    super(resource);
  }
}
