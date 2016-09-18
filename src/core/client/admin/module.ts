import { NgModule } from "@angular/core";
import { StatisticsComponent } from "./statistics/statistics.component";
import { AdminUsersComponent } from "./users/user-list.component";
import { ROUTER } from "./router";
import { CoreComponentsModule } from "../components/module";
import { LayoutModule } from "../layout/module";
import { CoreAuthModule } from "../auth/module";

@NgModule({
  declarations: [
    StatisticsComponent,
    AdminUsersComponent],
  entryComponents: [
    StatisticsComponent
  ],
  imports: [
    ROUTER,
    CoreComponentsModule,
    LayoutModule,
    CoreAuthModule
  ],
  providers: []
})
export class CoreAdminModule {
  constructor() {

    LayoutModule.HomePage.push({
      factory: StatisticsComponent,
      role: 'admin'
    });

    LayoutModule.MainMenu.push(
      {
        title: 'Admin Users',
        state: '/admin/users',
        role: 'admin'
      });
  }
}
