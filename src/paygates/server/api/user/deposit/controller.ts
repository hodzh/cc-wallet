import { RouteControllerUserCollection } from '../../../../../core/server/web/collection-user-controller';

var Deposit = require('../../../model/deposit');

export class DepositController extends RouteControllerUserCollection {
  constructor() {
    super(Deposit);
  }
}
