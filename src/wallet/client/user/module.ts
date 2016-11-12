import { NgModule } from '@angular/core';
import { FilteredAccountDataSource } from './account/filtered-account.data-source';
import { AllAccountDataSource } from './account/all-account.data-source';
import { AccountDataSource } from './account/account.data-source';
import { AccountResource } from './account/account.resource';
import { CoreComponentsModule } from '../../../core/client/components/module';
import { AccountFilterComponent } from './account/account-filter.component';
import { AccountListComponent } from './account/account-list.component';
import { WalletCurrencyModule } from '../currency/module';
import { CommonModule } from '@angular/common';
import { Router } from './router';
import { LayoutModule } from '../../../core/client/layout/module';

@NgModule({
  imports: [
    CommonModule,
    CoreComponentsModule,
    WalletCurrencyModule,
    Router
  ],
  entryComponents: [
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
export class WalletUserModule {
  constructor() {
    LayoutModule.HomePage.push({
      factory: AccountListComponent,
      role: 'user'
    });
  }
}
