import { RouteControllerCollection } from '../../../../../core/server/web/collection-controller';

var Withdrawal = require('../../../model/withdrawal');

export class AdminWithdrawalController extends RouteControllerCollection {
  constructor() {
    super(Withdrawal);
  }
}
