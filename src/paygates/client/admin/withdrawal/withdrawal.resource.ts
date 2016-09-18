import { Injectable } from "@angular/core";
import { Resource } from "../../../../core/client/common/resource";
import { AuthHttp } from "../../../../core/client/auth/auth-http";
import { AdminWithdrawal } from "./withdrawal";

@Injectable()
export class AdminWithdrawalResource extends Resource<AdminWithdrawal> {

  constructor(http: AuthHttp) {
    super(http);
    this.URL = '/aapi/paygates/withdrawal';
  }
}
