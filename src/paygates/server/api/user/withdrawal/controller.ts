import { RouteControllerUserCollection } from '../../../../../core/server/web/collection-user-controller';

var Withdrawal = require('../../../model/withdrawal');

export class WithdrawalController extends RouteControllerUserCollection {
  constructor() {
    super(Withdrawal);
  }
}
