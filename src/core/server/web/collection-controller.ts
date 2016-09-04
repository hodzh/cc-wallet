'use strict';

var Promise = require('bluebird');
var controller = require('./controller');

export = factory;

function factory(model) {
  return {
    index: index,
    show: show,
    create: create,
    update: update,
    destroy: destroy
  };

// Gets a list of object
  function index(req, res) {
    return Promise.resolve()
      .then(function () {
        return model.query({}, {
          page: req.query.page,
          limit: req.query.limit
        });
      })
      .then(controller.responseWithResult(res))
      .catch(controller.handleError(res));
  }

// Gets a single object from the DB
  function show(req, res) {
    return Promise.resolve()
      .then(function () {
        return model.findById(req.params.id);
      })
      .then(controller.handleEntityNotFound(res))
      .then(controller.responseWithResult(res))
      .catch(controller.handleError(res));
  }

// Creates a new object in the DB
  function create(req, res) {
    return Promise.resolve()
      .then(function () {
        return model.create(req.body);
      })
      .then(controller.responseWithResult(res, 201))
      .catch(controller.handleError(res));
  }

// Updates an existing object in the DB
  function update(req, res) {
    return Promise.resolve()
      .then(function () {
        if (req.body._id) {
          delete req.body._id;
        }
        return model.findById(req.params.id)
      })
      .then(controller.handleEntityNotFound(res))
      .then(saveUpdates(req.body))
      .then(controller.responseWithResult(res))
      .catch(controller.handleError(res));
  }

// Deletes a object from the DB
  function destroy(req, res) {
    return Promise.resolve()
      .then(function () {
        return model.findById(req.params.id);
      })
      .then(controller.handleEntityNotFound(res))
      .then(removeEntity(res))
      .catch(controller.handleError(res));
  }

}

function saveUpdates(updates) {
  return function(entity) {
    var updated = Object.merge(entity, updates);
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
