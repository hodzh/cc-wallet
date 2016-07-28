import {
  HOME_PAGE
} from '../../../core/client/common/home';

import {
  AccountListComponent
} from '../user/account/account-list.component.ts';

HOME_PAGE.content.push({
  factory: AccountListComponent,
  role: 'user'
});
