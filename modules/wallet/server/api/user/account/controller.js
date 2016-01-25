/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/accounts              ->  index
 * POST    /api/accounts              ->  create
 * GET     /api/accounts/:id          ->  show
 * PUT     /api/accounts/:id          ->  update
 * DELETE  /api/accounts/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Account = require('../../../model/account');
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

function responseWithUserResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity.getUserData());
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

// Gets a list of Accounts
exports.index = function(currencies) {
  return getUserAccounts;

  function getUserAccounts(req, res) {
    Account.getAccounts('user', req.user._id)
      .then(responseWithResult(res))
      .catch(handleError(res));
  }
};

// Gets a single Account from the DB
exports.show = function(req, res) {
  Account.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(responseWithUserResult(res))
    .catch(handleError(res));
};

exports.enable = function(req, res) {
  Account.enable(
    {
      type: 'user',
      owner: req.user._id,
      currency: req.params.id
    },
    true)
    .then(handleEntityNotFound(res))
    .then(responseWithUserResult(res))
    .catch(handleError(res));
};

exports.disable = function(req, res) {
  Account.enable(
    {
      type: 'user',
      owner: req.user._id,
      currency: req.params.id
    },
    false)
    .then(handleEntityNotFound(res))
    .then(responseWithUserResult(res))
    .catch(handleError(res));
};

exports.cashOut = function(req, res) {
  Transaction.cashOut(req.user._id, req.params.id, req.body)
    .then(handleEntityNotFound(res))
    .then(responseWithUserResult(res))
    .catch(handleError(res));
};