import { Component } from "@angular/core";
import { ACCOUNT_LIST_SCHEMA } from "./account-list-schema";
import { FilteredAccountDataSource } from "./filtered-account.data-source";
import { AccountDataSource } from "./account.data-source";

const styles = require('./account-list.component.scss');
const template = require('./account-list.component.html');

@Component({
  template,
  styles: [styles]
})
export class AccountListComponent {
  public schema = ACCOUNT_LIST_SCHEMA;

  constructor(private source: FilteredAccountDataSource,
              private accountDataSource: AccountDataSource) {
    source.read();
  }

  ngOnInit() {
    this.accountDataSource.startAutoUpdate();
  }

  ngOnDestroy() {
    this.accountDataSource.stopAutoUpdate();
  }
}
