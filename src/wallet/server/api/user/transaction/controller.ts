import { RouteControllerUserCollection } from '../../../../../core/server/web/collection-user-controller';

var Transaction = require('../../../model/transaction');

export class TransactionController extends RouteControllerUserCollection {
  constructor() {
    super(Transaction);
  }
}
