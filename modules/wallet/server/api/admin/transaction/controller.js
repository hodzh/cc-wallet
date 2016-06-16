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

// Gets a list of Transactions
exports.index = function(req, res) {
  //Transaction.find()
  Transaction.find().limit(20).exec()
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

// Creates a new Transaction in the DB
exports.create = function(req, res) {
  Transaction.create(req.body)
    .then(responseWithResult(res, 201))
    .catch(handleError(res));
};

// Updates an existing Transaction in the DB
exports.update = function(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Transaction.findById(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Deletes a Transaction from the DB
exports.destroy = function(req, res) {
  Transaction.findById(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
};
