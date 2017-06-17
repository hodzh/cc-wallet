var Withdrawal = require('../../../model/withdrawal');
var CollectionController = require('../../../../../core/server/web/collection-user-controller');
var controller = require('../../../../../core/server/web/controller');
var collectionController = CollectionController(Withdrawal);

export = collectionController;
