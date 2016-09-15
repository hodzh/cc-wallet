import { Routes } from '@angular/router';
import { LoginComponent } from './login';
import { SignupComponent } from './signup';
import { AuthGuard, NoAuthGuard } from '../auth';
import { SettingsComponent } from './settings';

export const USER_ROUTES: Routes = [
  {
    path: 'login',
    component: LoginComponent,
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
  },

];
