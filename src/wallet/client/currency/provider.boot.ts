import { ROOT_PROVIDERS } from '../../../core/client/common/root-providers';
import { CurrencyDataSource } from './currency-data-source';
import { CurrencyResource } from './currency.resource';

ROOT_PROVIDERS.push(CurrencyDataSource, CurrencyResource);
