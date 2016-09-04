import { ROOT_PROVIDERS } from '../../../core/client/common/root-providers';
import { AccountDataSource } from './account/account.data-source';
import { AccountResource } from './account/account.resource';
import { AllAccountDataSource } from './account/all-account.data-source';
import { CurrencyResource } from '../currency/currency.resource';

ROOT_PROVIDERS.push(
  AccountResource,
  CurrencyResource,
  AccountDataSource,
  AllAccountDataSource
);
