import { NgModule } from '@angular/core';
import { ROUTER } from './router';
import { LoginComponent } from './login/login.component';
import { SettingsComponent } from './settings/settings.component';
import { SignupComponent } from './signup/signup.component';
import { LoginFormComponent } from './login/login-form.component';
import { LoginModalComponent } from './login/login-modal.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { CoreComponentsModule } from '../components/module';
import { CoreAuthModule } from '../auth/module';
import { SetPasswordComponent } from './set-password/set-password.component';
import { ResetPasswordDoneComponent } from './reset-password-done/reset-password-done.component';

@NgModule({
  declarations: [
    LoginComponent,
    SettingsComponent,
    SignupComponent,
    LoginFormComponent,
    LoginModalComponent,
    ResetPasswordComponent,
    ResetPasswordDoneComponent,
    SetPasswordComponent,
  ],
  entryComponents: [],
  imports: [
    ROUTER,
    CoreComponentsModule,
    //LayoutModule,
    CoreAuthModule,
  ],
  providers: []
})
export class CoreUserModule {
}
