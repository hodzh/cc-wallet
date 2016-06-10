'use strict';

var log = require('log4js').getLogger('paygates');
var _ = require('lodash');
var Deposit = require('../../../model/deposit');

module.exports = controllerFactory;

function controllerFactory(){
  return {
    index: index,
    show: show,
    create: create,
    update: update,
    destroy: destroy
  };

  function index(req, res) {
    Deposit.find().limit(20).execAsync()
      .then(responseWithResult(res))
      .catch(handleError(res));
  }

  function show(req, res) {
    Deposit.findById(req.params.id)
      .then(handleEntityNotFound(res))
      .then(responseWithResult(res))
      .catch(handleError(res));
  }

  function create(req, res) {
    var deposit = new Deposit(req.body);
    deposit.save()
      .then(function () {
        return deposit.toObject();
      })
      .then(responseWithResult(res, 201))
      .catch(handleError(res));
  }

  function update(req, res) {
    Deposit.findById(req.params.id)
      .then(handleEntityNotFound(res))
      .then(saveUpdates(req.body))
      .then(responseWithResult(res))
      .catch(handleError(res));
  }

  function destroy(req, res) {
    Deposit.findById(req.params.id)
      .then(handleEntityNotFound(res))
      .then(removeEntity(res))
      .catch(handleError(res));
  }
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    log.error(err);
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

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.save()
      .spread(function(updated) {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.remove()
        .then(function() {
          res.status(204).end();
        });
    }
  };
}