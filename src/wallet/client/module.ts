import { NgModule } from "@angular/core";
import { WalletAdminModule } from "./admin/module";
import { WalletUserModule } from "./user/module";


@NgModule({
  imports: [
    WalletUserModule,
    WalletAdminModule
  ]
})
export class WalletModule {
}
