import { NgModule } from "@angular/core";
import { Router } from "./router";
import { DevDbComponent } from "./db/db.component";
import { LayoutModule } from "../../core/client/layout/module";

@NgModule({
  imports: [
    Router
  ],
  declarations: [
    DevDbComponent
  ],
  providers: []
})
export class DevModule {
  constructor() {
    LayoutModule.MainMenu.push(
      {
        title: 'DB Dev',
        state: '/dev/db'
      }
    );
  }
}
