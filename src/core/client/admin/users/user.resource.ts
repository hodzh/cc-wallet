import { Injectable } from '@angular/core';
import { AuthHttp } from '../../auth';
import { Resource } from '../../common';
import { AdminUser } from './user';

@Injectable()
export class AdminUserResource extends Resource<AdminUser> {

  constructor(http: AuthHttp) {
    super(http);
    this.URL = '/aapi/user';
  }
}
