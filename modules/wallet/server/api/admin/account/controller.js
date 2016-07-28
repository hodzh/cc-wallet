'use strict';

var Promise = require('bluebird');
var Account = require('../../../model/account');
var Transaction = require('../../../model/transaction');
var controller = require('../../../../../core/server/web/controller');
var CollectionController = require('../../../../../core/server/web/collection-controller');
module.exports = CollectionController(Account);

module.exports.income = function(req, res) {
  return Promise.resolve()
    .then(function(){
      return Transaction
        .income(req.user._id, req.params.id, req.query);
    })
    .then(controller.handleEntityNotFound(res))
    .then(function(result){
      return result.accountTo.toObject();
    })
    .then(controller.responseWithResult(res))
    .catch(controller.handleError(res));
};

module.exports.outcome = function(req, res) {
  return Promise.resolve()
    .then(function(){
      return Transaction
        .outcome(req.user._id, req.params.id, req.query);
    })
    .then(controller.handleEntityNotFound(res))
    .then(function(result){
      return result.accountFrom.toObject();
    })
    .then(controller.responseWithResult(res))
    .catch(controller.handleError(res));
};
