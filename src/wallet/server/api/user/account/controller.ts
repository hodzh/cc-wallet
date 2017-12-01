import { RouteControllerUserCollection } from '../../../../../core/server/web/collection-user-controller';
import { HttpError } from '../../../../../core/server/web/http-error';

var Account = require('../../../model/account');

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

  async index(req, res) {
    let accounts = await Account.getAccounts('user', req.user._id);
    this.responseWithResult(res, accounts.map(account => account.sanitize()));
  }

  async show(req, res) {
    let account = await Account.findById(req.params.id);
    this.handleEntityNotFound(res, account);
    this.checkOwner(req, account);
    if (account.type != 'user') {
      throw new HttpError('not found', 404);
    }
    this.responseWithResult(res, account.sanitize());
  }
}
