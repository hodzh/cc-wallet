import { NgModule } from '@angular/core';
import { CurrencyResource } from '../currency/currency.resource';
import { CurrencyDataSource } from './currency-data-source';
import { CurrencyToTextPipe } from './currency-to-text.pipe';
import { CurrencyFromTextPipe } from './currency-from-text.pipe';

@NgModule({
  imports: [],
  declarations: [
    CurrencyToTextPipe,
    CurrencyFromTextPipe
  ],
  exports: [
    CurrencyToTextPipe,
    CurrencyFromTextPipe
  ],
  providers: [
    CurrencyResource,
    CurrencyDataSource
  ]
})
export class WalletCurrencyModule {
}
