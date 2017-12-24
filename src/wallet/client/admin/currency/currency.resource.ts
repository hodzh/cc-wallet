import { Injectable } from '@angular/core';
import { Resource } from '../../../../core/client/common/resource';
import { AuthHttp } from '../../../../core/client/auth/auth-http';
import { AdminCurrency } from './currency';

@Injectable()
export class AdminCurrencyResource extends Resource<AdminCurrency> {

  constructor(http: AuthHttp) {
    super(http);
    this.URL = '/aapi/currency';
  }
}
