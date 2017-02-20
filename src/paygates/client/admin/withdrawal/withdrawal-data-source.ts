import { Injectable } from '@angular/core';
import { PageDataSource } from '../../../../core/client/common/page-data-source';
import { AdminWithdrawal } from './withdrawal';
import { AdminWithdrawalResource } from './withdrawal.resource';

@Injectable()
export class AdminWithdrawalDataSource extends PageDataSource<AdminWithdrawal> {

  constructor(resource: AdminWithdrawalResource) {
    super(resource, {
      paginate: true,
      sortable: true
    });
  }
}
