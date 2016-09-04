import { AdminGuard } from '../../../core/client/auth';
import { AdminDepositListComponent } from './deposit/deposit-list.component';
import { AdminWithdrawalListComponent } from './withdrawal/withdrawal-list.component';
import { ADMIN_ROUTES } from '../../../core/client/admin/routes';

ADMIN_ROUTES.push(
  {
    path: 'admin/deposit',
    component: AdminDepositListComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'admin/withdrawal',
    component: AdminWithdrawalListComponent,
    canActivate: [AdminGuard]
  }
);
