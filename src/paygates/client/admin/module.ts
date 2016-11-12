import { NgModule } from '@angular/core';
import { AdminWithdrawalListComponent } from './withdrawal/withdrawal-list.component';
import { AdminDepositListComponent } from './deposit/deposit-list.component';
import { Router } from './router';
import { CoreComponentsModule } from '../../../core/client/components/module';
import { WalletModule } from '../../../wallet/client/module';
import { LayoutModule } from '../../../core/client/layout/module';


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
  providers: []
})
export class PaygatesAdminModule {
  constructor() {

    LayoutModule.MainMenu.push(
      {
        title: 'Admin Deposit',
        state: '/admin/deposit',
        role: 'admin'
      },
      {
        title: 'Admin Withdrawal',
        state: '/admin/withdrawal',
        role: 'admin'
      }
    );
  }
}
