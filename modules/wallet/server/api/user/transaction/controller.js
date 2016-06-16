'use strict';

var _ = require('lodash');
var Transaction = require('../../../model/transaction');

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

function responseWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

// Gets a list of Transactions
exports.index = function(req, res) {
  Transaction.find()
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Gets a single Transaction from the DB
exports.show = function(req, res) {
  Transaction.findById(req.params.id)
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
};