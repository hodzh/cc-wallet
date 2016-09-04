import { RouterConfig } from '@angular/router';
import { HomeComponent } from './home';
import { LoginComponent } from './user/login';
import { AuthGuard, NoAuthGuard } from './auth';
import { ADMIN_ROUTES } from './admin/routes';
import { USER_ROUTES } from './user/routes';

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
