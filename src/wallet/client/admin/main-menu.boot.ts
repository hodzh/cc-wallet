import { MAIN_MENU } from '../../../core/client/common/main-menu';

MAIN_MENU.push(
  {
    title: 'Admin Accounts',
    state: '/admin/account',
    role: 'admin'
  },
  {
    title: 'Admin Transactions',
    state: '/admin/transaction',
    role: 'admin'
  }
);
