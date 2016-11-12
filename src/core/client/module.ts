import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { ROUTER } from './router';
import { CoreComponentsModule } from './components/module';
import { LayoutModule } from './layout/module';
import { CoreAdminModule } from './admin/module';
import { CoreUserModule } from './user/module';
import { CoreAuthModule } from './auth/module';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    CoreAuthModule,
    ROUTER,
    CoreComponentsModule,
    LayoutModule,
    CoreAdminModule,
    CoreUserModule
  ]
})
export class CoreModule {
}
