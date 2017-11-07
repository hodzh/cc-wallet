import { NgModule } from '@angular/core';
import { AppComponent } from '../../../core/client/layout/app.component';
import { RouterModule } from '@angular/router';
import { CoreModule } from '../../../core/client/module';
import { DevModule } from '../../../dev/client/module';
import { WalletModule } from '../../../wallet/client/module';
import { PaygatesModule } from '../../../paygates/client/module';
import { LayoutModule } from '../../../core/client/layout/module';

@NgModule({
  bootstrap: [AppComponent],
  imports: [
    CoreModule,
    //...(PRODUCTION ? [] : [DevModule]),
    WalletModule,
    PaygatesModule,

    RouterModule.forRoot([])
  ]
})
export class AppModule {
  constructor() {
    LayoutModule.MainMenu.push(
      {
        title: 'History',
        state: '/history',
        role: 'user'
      }
    );
  }
}
