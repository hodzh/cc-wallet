import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { AUTH_PROVIDERS } from "./auth/index";
import { HttpModule } from "@angular/http";
import { ROUTER } from "./router";
import { CoreComponentsModule } from "./components/module";
import { HomeComponent } from "./home/home.component";
import { AdminUsersComponent } from "./admin/users/user-list.component";
import { LoginComponent } from "./user/login/login.component";
import { SettingsComponent } from "./user/settings/settings.component";
import { SignupComponent } from "./user/signup/signup.component";
import { LoginFormComponent } from "./user/login/login-form.component";
import { LoginModalComponent } from "./user/login/login-modal.component";
import { StatisticsComponent } from "./admin/statistics/statistics.component";
import { GuestHome } from "./home/guest.component";
import { ResetPasswordComponent } from "./user/reset-password/reset-password.component";

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
    LoginModalComponent,
    ResetPasswordComponent],
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
    ...AUTH_PROVIDERS
  ]
})
export class CoreModule { }
