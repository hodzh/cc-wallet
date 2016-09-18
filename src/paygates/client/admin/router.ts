import { AdminGuard } from "../../../core/client/auth";
import { AdminDepositListComponent } from "./deposit/deposit-list.component";
import { AdminWithdrawalListComponent } from "./withdrawal/withdrawal-list.component";
import { RouterModule } from "@angular/router";

export const Router = RouterModule.forChild([
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
]);
