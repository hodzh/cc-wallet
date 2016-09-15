import { Routes } from '@angular/router';
import { AdminUsersComponent } from './users';
import { AdminGuard } from '../auth/admin-guard';

export const ADMIN_ROUTES: Routes = [
  {
    path: 'admin/users',
    component: AdminUsersComponent,
    canActivate: [AdminGuard]
  }
];
