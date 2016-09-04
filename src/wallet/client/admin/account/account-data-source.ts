import { Injectable } from '@angular/core';
import { Resource } from '../../../../core/client/common/resource';
import { AuthHttp } from '../../../../core/client/auth/auth-http';
import { AdminAccount } from './account';
import { PageDataSource } from '../../../../core/client/common/page-data-source';
import { AdminAccountResource } from './account.resource';
import { CurrencyDataSource } from '../../currency/currency-data-source';
import { Observable } from 'rxjs';
import { Currency } from '../../currency/currency';

export interface TransactionParams {
  amount: string;
}

export interface TransactionResult {
  accountFrom: AdminAccount;
  accountTo: AdminAccount;
}

@Injectable()
export class AdminAccountDataSource extends PageDataSource<AdminAccount> {

  public get documents(): Observable<AdminAccount[]> {
    return this.mergeAccounts;
  }

  private mergeAccounts: Observable<AdminAccount[]>;

  constructor(resource: AdminAccountResource,
              private currencyDataSource: CurrencyDataSource) {
    super(resource, {
      paginate: true,
      sortable: true
    });

    this.mergeAccounts = this.documentsSubject.asObservable()
      .combineLatest(
        this.currencyDataSource.documents,
        this.updateAccountCurrency.bind(this)
      );
  }

  private updateAccountCurrency(
    accounts: AdminAccount[],
    currencies: Currency[]) {
    if (!accounts || !currencies) {
      return [];
    }
    accounts.forEach(account => {
      let currency = currencies.find(currency =>
        account.currency === currency.name);
      if (currency) {
        account.decimal = currency.decimal;
        account.code = currency.code;
        account.fee = currency.fee;
      }
    });
    return accounts;
  }

  public income(id: string, params: TransactionParams) {
    let income = this.resource.action(id, 'income', params);
    income.subscribe((incomeRes: TransactionResult) => {
      this.onDocumentChanged(incomeRes.accountTo);
      this.onDocumentChanged(incomeRes.accountFrom);
    });
    return income;
  }

  public outcome(id: string, params: TransactionParams) {
    let outcome = this.resource.action(id, 'outcome', params);
    outcome.subscribe((outcomeRes) => {
      this.onDocumentChanged(outcomeRes.accountTo);
      this.onDocumentChanged(outcomeRes.accountFrom);
    });
    return outcome;
  }
}
