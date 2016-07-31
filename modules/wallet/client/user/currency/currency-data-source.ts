import {
  Injectable
} from '@angular/core';
import { DataSource } from '../../../../core/client/common/data-source';
import { CurrencyResource } from './currency.resource';

@Injectable()
export class CurrencyDataSource extends DataSource {

  constructor(resource: CurrencyResource) {
    super(resource, {
      paginate: false,
      sortable: true
    });
  }
}
