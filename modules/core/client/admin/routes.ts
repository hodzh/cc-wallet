import {
  RouterConfig
} from '@angular/router';

import {
  AdminUsersComponent
} from './users';

import {
  AdminGuard
} from '../auth/admin-guard';

export const ADMIN_ROUTES: RouterConfig = [
  {
    path: 'admin/users',
    component: AdminUsersComponent,
    canActivate: [AdminGuard]
  }
];
