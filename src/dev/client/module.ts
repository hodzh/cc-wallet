import { NgModule }       from '@angular/core';
import { Router } from './router';
import { DevDbComponent } from "./db/db.component";

@NgModule({
  imports: [
    Router
  ],
  declarations: [
    DevDbComponent
  ],
  providers: [
  ]
})
export class DevModule {}
