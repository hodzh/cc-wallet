import { Injectable } from '@angular/core';
import { Account } from './account';
import {DataSource, DataSourceDecorator} from '../../../../core/client/common/data-source';
import { AccountDataSource } from './account.data-source';
import { CurrencyDataSource } from '../../currency/currency-data-source';
import { Observable } from 'rxjs/Observable';
import { AllAccountDataSource } from './all-account.data-source';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class FilteredAccountDataSource extends DataSourceDecorator<Account> {
  public get documents(): Observable<Account[]> {
    return this.filteredAccounts;
  }

  public get search$(): Observable<string> {
    return this.searchSubject.asObservable();
  }
  public set search(value: string) {
    this.searchSubject.next(value);
  }
  private searchSubject: BehaviorSubject<string>;

  public get hideZeroBalance$(): Observable<boolean> {
    return this.hideZeroBalanceSubject.asObservable();
  }
  public set hideZeroBalance(value: boolean) {
    this.hideZeroBalanceSubject.next(value);
  }
  private hideZeroBalanceSubject: BehaviorSubject<boolean>;

  private filteredAccounts: Observable<Account[]>;

  constructor(private accountDataSource: AllAccountDataSource) {
    super(accountDataSource);
    this.searchSubject = new BehaviorSubject<string>('');
    this.hideZeroBalanceSubject = new BehaviorSubject<boolean>(false);
    this.filteredAccounts = this.accountDataSource.documents
      .combineLatest(
        this.search$
          .debounceTime(400),
        this.hideZeroBalance$,
        (accounts: Account[],
         searchString: string,
         hideZeroBalance: boolean): Account[] =>
          this.filterAccounts(accounts, searchString, hideZeroBalance)
      );
  }

  private filterAccounts(
    accounts: Account[],
    searchString: string,
    hideZeroBalance: boolean): Account[] {
    if (!accounts || !accounts.length ||
      (!searchString && !hideZeroBalance)) {
      return accounts;
    }
    return accounts.filter((account:Account): boolean => {
      if (searchString) {
        if (account.code.toLowerCase().indexOf(searchString.toLowerCase()) === -1
          && account.currency.toLowerCase().indexOf(searchString.toLowerCase()) === -1) {
          return false;
        }
      }
      if (hideZeroBalance) {
        if (!account.balance || account.balance === '0') {
          return false;
        }
      }
      return true;
    });
  }
}
