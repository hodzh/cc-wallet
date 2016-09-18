import { Injectable } from "@angular/core";
import { AuthHttp } from "../../auth/auth-http";
import { Resource } from "../../common/resource";
import { AdminUser } from "./user";

@Injectable()
export class AdminUserResource extends Resource<AdminUser> {

  constructor(http: AuthHttp) {
    super(http);
    this.URL = '/aapi/user';
  }
}
