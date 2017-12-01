import { RouteControllerCollection } from '../../../../../core/server/web/collection-controller';

var Transaction = require('../../../model/transaction');

export class AdminTransactionController extends RouteControllerCollection {
  constructor() {
    super(Transaction);
  }
}
