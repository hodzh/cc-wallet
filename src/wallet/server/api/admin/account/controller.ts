import { RouteControllerCollection } from '../../../../../core/server/web/collection-controller';
import { Account } from '../../../model/account';
import { Transaction } from '../../../model/transaction';


export class AdminAccountController extends RouteControllerCollection {
  constructor() {
    super(Account);
  }

  async income(req, res) {
    let result = await Transaction
          .income(req.user._id, req.params.id, req.body);
    this.handleEntityNotFound(res, result);
    this.responseWithResult(res, result);
  }

  async outcome(req, res) {
    let result = await Transaction
          .outcome(req.user._id, req.params.id, req.body);
    this.handleEntityNotFound(res, result);
    this.responseWithResult(res, result);
  }
}
