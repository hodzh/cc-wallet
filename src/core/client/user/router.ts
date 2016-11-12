import { RouterModule } from '@angular/router';
import { LoginComponent } from './login';
import { SignupComponent } from './signup';
import { AuthGuard, NoAuthGuard } from '../auth';
import { SettingsComponent } from './settings';
import { ResetPasswordComponent } from './reset-password';
import { HomeComponent } from '../layout/home/home.component';

export const ROUTER = RouterModule.forChild([
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'signin',
    component: LoginComponent,
    canActivate: [NoAuthGuard]
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent,
    canActivate: [NoAuthGuard]
  },
  {
    path: 'signup',
    component: SignupComponent,
    canActivate: [NoAuthGuard]
  },
  {
    path: 'settings',
    component: SettingsComponent,
    canActivate: [AuthGuard]
  }
]);
