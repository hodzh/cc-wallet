import { Injectable } from '@angular/core';
import { Resource } from '../../../../core/client/common/resource';
import { AuthHttp } from '../../../../core/client/auth/auth-http';
import { AdminAccount } from './account';

export interface IncomeParams {
  amount: string;
}

@Injectable()
export class AdminAccountResource extends Resource<AdminAccount> {

  constructor(http: AuthHttp) {
    super(http);
    this.URL = '/aapi/account';
  }

  public income(id: string, params: IncomeParams) {
    return this.action(id, 'income', params);
  }

  public outcome(id: string, params: IncomeParams) {
    return this.action(id, 'outcome', params);
  }
}
