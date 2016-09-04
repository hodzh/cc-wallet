'use strict';

var _ = require('lodash');
var Transaction = require('../../../model/transaction');

function handleError(res, statusCode = 500) {
  return function (err) {
    res.status(statusCode).send(err);
  };
}

function responseWithResult(res, statusCode = 200) {
  return function (entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function handleEntityNotFound(res) {
  return function (entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

export = {
  index,
  show
}
// Gets a list of Transactions
function index(req, res) {
  Transaction.find()
    .then(responseWithResult(res))
    .catch(handleError(res));
}

// Gets a single Transaction from the DB
function show(req, res) {
  Transaction.findById(req.params.id)
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
};
