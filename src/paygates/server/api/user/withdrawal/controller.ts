'use strict';

var Promise = require('bluebird');
var _ = require('lodash');
var Withdrawal = require('../../../model/withdrawal');
var Account = require('../../../../../wallet/server/model/account');
var Transaction = require('../../../../../wallet/server/model/transaction');

export = controllerFactory;

function controllerFactory(game) {
  return {
    index: index,
    show: show
  };

  function index(req, res) {
    Withdrawal.find({
      owner: req.user._id
    })
      .then(responseWithResult(res))
      .catch(handleError(res));
  }

  function show(req, res) {
    Withdrawal.findById(req.params.id)
      .then(checkOwner(req.user._id))
      .then(handleEntityNotFound(res))
      .then(
        function (withdrawal) {
          if (!withdrawal) {
            return null;
          }
          return withdrawal.toObject();
        }
      )
      .then(responseWithResult(res))
      .catch(handleError(res));
  }
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function (err) {
    res.status(statusCode).send(err);
  };
}

function responseWithResult(res, statusCode) {
  statusCode = statusCode || 200;
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

function checkOwner(id) {
  return function (entity) {
    if (!entity) {
      return null;
    }
    if (entity.owner.toString() != id) {
      return null;
    }
    return entity;
  };
}
