import { Injectable } from '@angular/core';
import { Resource } from '../../../core/client/common/resource';
import { AuthHttp } from '../../../core/client/auth/auth-http';
import { Currency } from './currency';

@Injectable()
export class CurrencyResource extends Resource<Currency> {

  constructor(http: AuthHttp) {
    super(http);
    this.URL = '/api/currency';
  }
}
