import { Injectable } from '@angular/core';
import { CurrencyResource } from './currency.resource';
import { Currency } from './currency';
import { DataSource } from '../../../core/client/common/data-source';

@Injectable()
export class CurrencyDataSource extends DataSource<Currency> {

  constructor(resource: CurrencyResource) {
    super(resource);
    this.read();
  }
}
