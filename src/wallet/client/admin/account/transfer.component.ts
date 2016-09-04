import { Component, Input } from '@angular/core';
import { AdminAccount } from './account';
import { AdminAccountResource } from './account.resource';
import { CURRENCY_TEXT_CONVERTER } from '../../../common/currency-text-converter';
import { AdminAccountDataSource } from './account-data-source';

//const styles   = require('./deposit.css');
const template = require('./transfer.component.html');

@Component({
  selector: 'cc-admin-transfer',
  directives: [],
  template: template,
  //styles: [styles],
})
export class AdminTransferComponent {
  @Input() account: AdminAccount;
  private amount: string;

  constructor(private accountDataSource: AdminAccountDataSource) {
  }

  public income() {
    this.accountDataSource.income(this.account._id, {
      amount: this.getAmount()
    })
      .subscribe(
        () => {
        },
        (error) => {
          console.error(error);
        }
      );
  }

  public outcome() {
    this.accountDataSource.outcome(this.account._id, {
      amount: this.getAmount()
    })
      .subscribe(
        () => {
        },
        (error) => {
          console.error(error);
        }
      );
  }

  private getAmount() {
    return CURRENCY_TEXT_CONVERTER.toValue(this.amount, this.account);
  }
}
