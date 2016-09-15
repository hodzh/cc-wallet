import { Injectable } from '@angular/core';
import { Account } from './account';
import {DataSource, DataSourceDecorator} from '../../../../core/client/common/data-source';
import { AccountDataSource } from './account.data-source';
import { CurrencyDataSource } from '../../currency/currency-data-source';
import { Observable } from 'rxjs/Observable';
import { Currency } from '../../currency/currency';

@Injectable()
export class AllAccountDataSource extends DataSourceDecorator<Account> {

  public get documents(): Observable<Account[]> {
    return this.allAccounts;
  }

  allAccounts: Observable<Account[]>;

  constructor(private account: AccountDataSource,
              private currencyDataSource: CurrencyDataSource) {
    super(account);
    this.allAccounts = this.account.documents
      .combineLatest(
        this.currencyDataSource.documents,
        (accounts: Account[],
         currencies: Currency[]): Account[] =>
          this.updateAccountCurrency(accounts, currencies)
      );
  }

  private updateAccountCurrency(accounts: Account[],
                                currencies: Currency[]): Account[] {
    if (!accounts || !currencies) {
      return [];
    }
    return currencies.map((currency: Currency): Account => {
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
