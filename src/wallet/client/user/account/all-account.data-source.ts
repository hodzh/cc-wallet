import { Injectable } from '@angular/core';
import { Account } from './account';
import { DataSource } from '../../../../core/client/common/data-source';
import { AccountDataSource } from './account.data-source';
import { CurrencyDataSource } from '../../currency/currency-data-source';
import { Observable } from 'rxjs/Observable';
import { Currency } from '../../currency/currency';

@Injectable()
export class AllAccountDataSource extends DataSource<Account> {
  public get documents(): Observable<Account[]> {
    return this.mergeAccounts;
  }

  protected mergeAccounts: Observable<Account[]>;

  constructor(private account: AccountDataSource,
              private currencyDataSource: CurrencyDataSource) {
    super(account.resource);
    this.mergeAccounts = this.documentsSubject.asObservable()
      .combineLatest(
        this.currencyDataSource.documents,
        this.updateAccountCurrency.bind(this)
      );
  }

  private updateAccountCurrency(accounts, currencies) {
    if (!accounts || !currencies) {
      return [];
    }
    return currencies.map((currency: Currency)=> {
      let account = accounts.find(account => {
        return account.currency === currency.name;
      });
      if (account) {
        account.fee = currency.fee;
        account.code = currency.code;
        account.decimal = currency.decimal;
        return account;
      }
      return {
        currency: currency.name,
        code: currency.code,
        decimal: currency.decimal,
        fee: currency.fee,
        balance: '0'
      };
    });
  }
}
