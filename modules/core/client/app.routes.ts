import { RouterConfig } from '@angular/router';
import { HomeComponent } from './home';
import { LoginComponent } from './user/login';
import { AuthGuard } from './auth';
import { NoAuthGuard } from './auth';
import { USER_ROUTES } from './user/routes';
import { ADMIN_ROUTES } from './admin/routes';

export const routes: RouterConfig = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },

  ...ADMIN_ROUTES,
  ...USER_ROUTES,

  {
    path: '**',
    component: LoginComponent,
    canActivate: [NoAuthGuard]
  },
  {
    path: '**',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },

];
