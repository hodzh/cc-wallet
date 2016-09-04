import { ROOT_PROVIDERS } from '../../../core/client/common/root-providers';
import { AdminAccountResource } from './account/account.resource';
import { AdminAccountDataSource } from './account/account-data-source';

ROOT_PROVIDERS.push(
  AdminAccountResource,
  AdminAccountDataSource,
  //AdminTransactionResource,
  //AdminTransactionDataSource,
);
