import { Injectable } from '@angular/core';
import { AdminCurrency } from './currency';
import { AdminCurrencyResource } from './currency.resource';
import { DataSource } from '../../../../core/client/common/data-source';

@Injectable()
export class AdminCurrencyDataSource extends DataSource<AdminCurrency> {

  constructor(
    resource: AdminCurrencyResource,
  ) {
    super(resource);
  }
}
