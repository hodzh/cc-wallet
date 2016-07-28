import {
  RouterConfig
} from '@angular/router';

import {
  AccountListComponent
} from './account/account-list.component';

import {
  AuthGuard
} from '../../../core/client/auth';

export const routes: RouterConfig = [
  /*{
    path: '/account',
    component: AccountListComponent,
    canActivate: [AuthGuard]
  }*/
];
