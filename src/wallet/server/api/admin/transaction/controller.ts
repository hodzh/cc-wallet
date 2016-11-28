var Promise = require('bluebird');
var Transaction = require('../../../model/transaction');
var controller = require('../../../../../core/server/web/controller');
var CollectionController = require('../../../../../core/server/web/collection-controller');
export = CollectionController(Transaction);
