var Deposit = require('../../../model/deposit');
var CollectionController = require('../../../../../core/server/web/collection-user-controller');
var collectionController = CollectionController(Deposit);
export = collectionController;
