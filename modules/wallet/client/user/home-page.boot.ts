import {
  HOME_PAGE
} from '../../../core/client/common/home-page';

import {
  AccountListComponent
} from '../user/account/account-list.component.ts';

HOME_PAGE.push({
  factory: AccountListComponent,
  role: 'user'
});
