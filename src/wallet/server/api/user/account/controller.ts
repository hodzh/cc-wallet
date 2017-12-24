import { RouteControllerUserCollection } from '../../../../../core/server/web/collection-user-controller';
import { Account } from '../../../model/account';

export class AccountController extends RouteControllerUserCollection {
  constructor() {
    super(Account);
  }

  async create(req, res) {
    let account = await Account.enable({
      owner: req.user._id,
      currency: req.body.currency,
      type: 'user',
    }, true);
    this.handleEntityNotFound(res, account);
    this.responseWithResult(res, account.sanitize());
  }

  onQuery(req, query) {
    super.onQuery(req, query);
    query.type = 'user';
  }
}
