import { NgModule } from '@angular/core';
import { AppComponent } from "../../core/client/app.component";
import { RouterModule } from "@angular/router";
import { CoreModule } from "../../core/client/module";
import { DevModule } from "../../dev/client/module";
import { WalletModule } from "../../wallet/client/module";
import { VpModule } from "../../vp/client/module";
import { PaygatesModule } from "../../paygates/client/module";
import { PaygatesBitcoinModule } from "../../paygates-bitcoin/client/module";

@NgModule({
  bootstrap: [AppComponent],
  imports: [
    CoreModule,
    DevModule,
    WalletModule,
    VpModule,
    PaygatesModule,
    PaygatesBitcoinModule,

    RouterModule.forRoot([

    ])
  ]
})
export class AppModule { }
