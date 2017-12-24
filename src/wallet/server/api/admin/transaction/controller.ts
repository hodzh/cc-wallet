import { RouteControllerCollection } from '../../../../../core/server/web/collection-controller';
import { Transaction } from '../../../model/transaction';

export class AdminTransactionController extends RouteControllerCollection {
  constructor() {
    super(Transaction);
  }
}
