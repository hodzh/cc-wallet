import { AdminGuard } from '../../../core/client/auth';
import { AdminAccountListComponent } from './account/account-list.component';
import { AdminTransactionListComponent } from './transaction/transaction-list.component';
import { ADMIN_ROUTES } from '../../../core/client/admin/routes';

ADMIN_ROUTES.push(
  {
    path: 'admin/account',
    component: AdminAccountListComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'admin/transaction',
    component: AdminTransactionListComponent,
    canActivate: [AdminGuard]
  }
);
