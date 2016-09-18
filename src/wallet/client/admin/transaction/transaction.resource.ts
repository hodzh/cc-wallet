import { Injectable } from "@angular/core";
import { Resource } from "../../../../core/client/common/resource";
import { AuthHttp } from "../../../../core/client/auth/auth-http";
import { Transaction } from "./transaction";

@Injectable()
export class AdminTransactionResource extends Resource<Transaction> {

  constructor(http: AuthHttp) {
    super(http);
    this.URL = '/aapi/transaction';
  }
}
