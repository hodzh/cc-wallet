import { RouterModule } from '@angular/router';
import { AdminUsersComponent } from './users';
import { AdminGuard } from '../auth/admin-guard';

export const ROUTER = RouterModule.forChild([
  {
    path: 'admin/users',
    component: AdminUsersComponent,
    canActivate: [AdminGuard]
  }
]);
