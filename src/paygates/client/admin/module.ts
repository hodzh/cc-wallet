import { NgModule }       from '@angular/core';
import { AdminWithdrawalListComponent } from "./withdrawal/withdrawal-list.component";
import { AdminDepositListComponent } from "./deposit/deposit-list.component";
import { Router } from "./router";
import { CoreComponentsModule } from "../../../core/client/components/module";
import { WalletModule } from "../../../wallet/client/module";


@NgModule({
  imports: [
    CoreComponentsModule,
    WalletModule,
    Router
  ],
  declarations: [
    AdminDepositListComponent,
    AdminWithdrawalListComponent
  ],
  entryComponents: [
    AdminDepositListComponent,
    AdminWithdrawalListComponent
  ],
  providers: [
  ]
})
export class PaygatesAdminModule {}
