import { Injectable } from "@angular/core";
import { Account } from "./account";
import { DataSource } from "../../../../core/client/common/data-source";
import { AccountResource } from "./account.resource";

@Injectable()
export class AccountDataSource extends DataSource<Account> {
  private autoUpdateInterval;
  constructor(resource: AccountResource) {
    super(resource);
  }

  startAutoUpdate() {
    if (this.autoUpdateInterval) {
      return;
    }
    const autoUpdateMs = 60000;
    this.autoUpdateInterval = setInterval(() => this.autoUpdate(), autoUpdateMs);
  }

  stopAutoUpdate() {
    if (!this.autoUpdateInterval) {
      return;
    }
    clearInterval(this.autoUpdateInterval);
    delete this.autoUpdateInterval;
  }

  autoUpdate() {
    this.read();
  }
}
