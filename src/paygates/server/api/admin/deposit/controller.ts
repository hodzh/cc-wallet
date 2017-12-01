import { RouteControllerCollection } from '../../../../../core/server/web/collection-controller';

var Deposit = require('../../../model/deposit');

export class AdminDepositController extends RouteControllerCollection {
  constructor() {
    super(Deposit);
  }
}
