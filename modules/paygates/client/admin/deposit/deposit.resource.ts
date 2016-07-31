import {
  Injectable
} from '@angular/core';
import { Resource } from '../../../../core/client/common/resource';
import { AuthHttp } from '../../../../core/client/auth/auth-http';

@Injectable()
export class AdminDepositResource extends Resource {

  constructor(http: AuthHttp) {
    super(http);
    this.URL = '/aapi/paygates/deposit';
  }
}
