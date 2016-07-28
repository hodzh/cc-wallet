import {
  Injectable
} from '@angular/core';

import {
  Http
} from '@angular/http';

import {
  Resource
} from '../../../../core/client/common/resource';
import { AuthHttp } from '../../../../core/client/auth/auth-http';

@Injectable()
export class CurrencyResource extends Resource {

  constructor(http: AuthHttp) {
    super(http);
    this.URL = '/api/currency';
  }
}
