import { NgModule } from "@angular/core";
import { PaygatesAdminModule } from "./admin/module";
import { PaygatesUserModule } from "./user/module";


@NgModule({
  imports: [
    PaygatesAdminModule,
    PaygatesUserModule
  ]
})
export class PaygatesModule {
}
