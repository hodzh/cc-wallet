'use strict';

var _ = require('lodash');
var Withdrawal = require('../../../model/withdrawal');

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
    Withdrawal.find().limit(20).execAsync()
      .then(responseWithResult(res))
      .catch(handleError(res));
  }

  function show(req, res) {
    Withdrawal.findByIdAsync(req.params.id)
      .then(handleEntityNotFound(res))
      .then(responseWithResult(res))
      .catch(handleError(res));
  }

  function create(req, res) {
    var withdrawal = new Withdrawal(req.body);
    withdrawal.saveAsync()
      .then(function () {
        return withdrawal.toObject();
      })
      .then(responseWithResult(res, 201))
      .catch(handleError(res));
  }

  function update(req, res) {
    Withdrawal.findByIdAsync(req.params.id)
      .then(handleEntityNotFound(res))
      .then(saveUpdates(req.body))
      .then(responseWithResult(res))
      .catch(handleError(res));
  }

  function destroy(req, res) {
    Withdrawal.findByIdAsync(req.params.id)
      .then(handleEntityNotFound(res))
      .then(removeEntity(res))
      .catch(handleError(res));
  }
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    console.log(err);
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
    return updated.saveAsync()
      .spread(function(updated) {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.removeAsync()
        .then(function() {
          res.status(204).end();
        });
    }
  };
}