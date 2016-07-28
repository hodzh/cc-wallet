import {
  Injectable
} from '@angular/core';

import {
  Http
} from '@angular/http';

import { AuthHttp } from '../../auth/auth-http';
import { Resource } from '../../common/resource';

@Injectable()
export class AdminUserResource extends Resource {

  constructor(http: AuthHttp) {
    super(http);
    this.URL = '/aapi/user';
  }
}
