'use strict';

var _ = require('lodash');
var Deposit = require('../../../model/deposit');
var Account = require('../../../../../wallet/server/model/account');

module.exports = controllerFactory;

function controllerFactory() {
  return {
    index: index,
    show: show
  };

  function index(req, res) {
    Deposit.find({
        owner: req.user._id
      })
      .then(responseWithResult(res))
      .catch(handleError(res));
  }

  function show(req, res) {
    Deposit.findById(req.params.id)
      .then(checkOwner(req.user._id))
      .then(handleEntityNotFound(res))
      .then(responseWithResult(res))
      .catch(handleError(res));
  }

}

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

function checkOwner(id) {
  return function(entity) {
    if (!entity) {
      return null;
    }
    if (entity.owner.toString() != id) {
      return null;
    }
    return entity;
  };
}