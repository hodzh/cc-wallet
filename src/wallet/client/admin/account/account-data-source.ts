import { Injectable } from '@angular/core';
import { AdminAccount } from './account';
import { PageDataSource } from '../../../../core/client/common/page-data-source';
import { AdminAccountResource } from './account.resource';
import { Observable } from 'rxjs';
import { combineLatest } from 'rxjs/operators';
import { AdminCurrencyDataSource } from '../currency/currency-data-source';
import { AdminCurrency } from '../index';

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
              private currencyDataSource: AdminCurrencyDataSource) {
    super(resource, {
      paginate: true,
      sortable: true,
    });

    this.mergeAccounts = this.documentsSubject.asObservable().pipe(
      combineLatest(
        this.currencyDataSource.documents,
        (accounts: AdminAccount[],
         currencies: AdminCurrency[]): AdminAccount[] =>
          this.updateAccountCurrency(accounts, currencies),
      ));
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

  private updateAccountCurrency(accounts: AdminAccount[],
                                currencies: AdminCurrency[]): AdminAccount[] {
    if (!accounts || !currencies) {
      return [];
    }
    accounts.forEach(account => {
      let currency = currencies.find(currency =>
      account.currency === currency.code);
      if (currency) {
        account.currencyInfo = currency;
      } else {
        console.error('unknown currency');
      }
    });
    return accounts;
  }
}
