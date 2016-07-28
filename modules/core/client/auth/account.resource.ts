import {
  Injectable,
  Inject
} from '@angular/core';

import {
  Observable
} from 'rxjs/Observable';

import { AuthHttp } from './auth-http';
import { ChangePasswordParams } from './change-password-params';

@Injectable()
export class AccountResource {
  constructor(private authHttp: AuthHttp) {
  }

  profile(): Observable<any> {
    let req = this.authHttp.get(
      '/api/me');
    return req;
  }

  changePassword(params: ChangePasswordParams): Observable<any> {
    let body = JSON.stringify({
      oldPassword: params.password,
      newPassword: params.newPassword
    });
    let req = this.authHttp.put(
      '/api/me/password',
      body);
    return req;
  }
}
