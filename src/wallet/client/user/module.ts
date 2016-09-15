import { NgModule }       from '@angular/core';
import { FilteredAccountDataSource } from "./account/filtered-account.data-source";
import { AllAccountDataSource } from "./account/all-account.data-source";
import { AccountDataSource } from "./account/account.data-source";
import { CurrencyResource } from "../currency/currency.resource";
import { AccountResource } from "./account/account.resource";
import { CoreComponentsModule } from "../../../core/client/components/module";
import { AccountFilterComponent } from "./account/account-filter.component";
import { AccountListComponent } from "./account/account-list.component";
import { WalletCurrencyModule } from "../currency/module";
import { CommonModule } from "@angular/common";
import { Router } from "./router";

@NgModule({
  imports: [
    CommonModule,
    CoreComponentsModule,
    WalletCurrencyModule,
    Router
  ],
  entryComponents:[
    AccountListComponent
  ],
  declarations: [
    AccountFilterComponent,
    AccountListComponent
  ],
  providers: [
    AccountResource,
    AccountDataSource,
    AllAccountDataSource,
    FilteredAccountDataSource
  ]
})
export class WalletUserModule {}
