var Transaction = require('../../../model/transaction');
var controller = require('../../../../../core/server/web/controller');
var CollectionController = require('../../../../../core/server/web/collection-user-controller');
var collectionController = CollectionController(Transaction);
export = collectionController;