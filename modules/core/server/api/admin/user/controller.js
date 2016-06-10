'use strict';

var passport = require('passport');
var jwt = require('jsonwebtoken');

var User = require('../../../model/user.js');

function validationError(res, statusCode) {
  statusCode = statusCode || 422;
  return function(err) {
    res.status(statusCode).json(err);
  }
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

/**
 * Get list of users
 * restriction: 'admin'
 */
exports.index = function(req, res) {
  User.find({}, '-salt -password')
    .then(function(users) {
      res.status(200).json(users);
    })
    .catch(handleError(res));
};

/**
 * Get a single user
 */
exports.show = function(req, res, next) {
  var userId = req.params.id;

  User.findById(userId)
    .then(function(user) {
      if (!user) {
        return res.status(404).end();
      }
      res.json(user.profile);
    })
    .catch(function(err) {
      return next(err);
    });
};

/**
 * Update a single user
 */
exports.update = function(req, res, next) {
  var userId = req.params.id;

  User.findById(userId)
    .then(
      function(user) {
        if (!user) {
          return res.status(404).end();
        }
        if (req.body.name) {
          user.name = req.body.name;
        }
        if (req.body.email) {
          user.email = req.body.email;
        }
        if (req.body.password) {
          user.password = req.body.password;
        }
        if (req.body.role) {
          user.role = req.body.role;
        }
        return user.save();
      }
    )
    .then(
      function(user){
        res.json(user.profile);
      }
    )
    .catch(function(err) {
      return next(err);
    });
};

/**
 * Deletes a user
 */
exports.destroy = function(req, res) {
  User.findByIdAndRemove(req.params.id)
    .then(function() {
      res.status(204).end();
    })
    .catch(handleError(res));
};

/**
 * Creates a new user
 */
exports.create = function(req, res, next) {
  var newUser = new User(req.body);
  newUser.provider = 'local';
  newUser.role = 'user';
  newUser.save()
    .spread(function(user) {
      res.json(user);
    })
    .catch(validationError(res));
};
