import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AdminAccountResource } from "./account/account.resource";
import { AdminAccountDataSource } from "./account/account-data-source";
import { CoreComponentsModule } from "../../../core/client/components/module";
import { AdminAccountListComponent } from "./account/account-list.component";
import { AdminTransactionListComponent } from "./transaction/transaction-list.component";
import { AdminTransferComponent } from "./account/transfer.component";
import { WalletCurrencyModule } from "../currency/module";
import { Router } from "./router";
import { LayoutModule } from "../../../core/client/layout/module";


@NgModule({
  imports: [
    CommonModule,
    CoreComponentsModule,
    WalletCurrencyModule,
    Router
  ],
  declarations: [
    AdminAccountListComponent,
    AdminTransferComponent,
    AdminTransactionListComponent
  ],
  entryComponents: [
    AdminAccountListComponent,
    AdminTransactionListComponent,
    AdminTransferComponent
  ],
  providers: [
    AdminAccountResource,
    AdminAccountDataSource,
    //AdminTransactionResource,
    //AdminTransactionDataSource,
  ]
})
export class WalletAdminModule {
  constructor() {
    LayoutModule.MainMenu.push(
      {
        title: 'Admin Accounts',
        state: '/admin/account',
        role: 'admin'
      },
      {
        title: 'Admin Transactions',
        state: '/admin/transaction',
        role: 'admin'
      }
    );
  }
}
