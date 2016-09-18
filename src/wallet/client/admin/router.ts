import { AdminGuard } from "../../../core/client/auth";
import { AdminAccountListComponent } from "./account/account-list.component";
import { AdminTransactionListComponent } from "./transaction/transaction-list.component";
import { RouterModule } from "@angular/router";

export const Router = RouterModule.forChild([
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
]);
