import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent }  from './app.component';
import {ROOT_PROVIDERS} from "./common/root-providers";
import {AUTH_PROVIDERS} from "./auth/index";
import {HttpModule} from "@angular/http";
import { ROUTER } from "./router";
import {CoreComponentsModule} from "./components/module";
import {HomeComponent} from "./home/home.component";
import {AdminUsersComponent} from "./admin/users/user-list.component";
import {LoginComponent} from "./user/login/login.component";
import {SettingsComponent} from "./user/settings/settings.component";
import {SignupComponent} from "./user/signup/signup.component";
import {LoginFormComponent} from "./user/login/login-form.component";
import {LoginModalComponent} from "./user/login/login-modal.component";
import { StatisticsComponent } from "./admin/statistics/statistics.component";
import { GuestHome } from "./home/guest.component";
//import { provideForms, disableDeprecatedForms } from"@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    StatisticsComponent,
    GuestHome,
    AdminUsersComponent,
    LoginComponent,
    SettingsComponent,
    SignupComponent,
    LoginFormComponent,
    LoginModalComponent],
  entryComponents:[
    StatisticsComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ROUTER,
    CoreComponentsModule
  ],
  providers: [
    //provideForms(),
    //disableDeprecatedForms(),
    ...AUTH_PROVIDERS,
    ...ROOT_PROVIDERS
  ]
})
export class CoreModule { }
