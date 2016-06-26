'use strict';

var Promise = require('bluebird');
var log = require('log4js').getLogger('token');
var jwt = require('jsonwebtoken');

var User = require('../../../model/user');

module.exports = controllerFactory;

function controllerFactory() {
  return {
    create: create,
    changePassword: changePassword,
    me: me,
    authCallback: authCallback
  };

  function validationError(res, statusCode) {
    statusCode = statusCode || 422;
    return function (err) {
      res.status(statusCode).json(err);
    }
  }

  function handleError(res, statusCode) {
    statusCode = statusCode || 500;
    return function (err) {
      res.status(statusCode).send(err);
    };
  }

  /**
   * Change a users password
   */
  function changePassword(req, res, next) {
    var userId = req.user._id;
    var oldPass = String(req.body.oldPassword);
    var newPass = String(req.body.newPassword);

    User.findById(userId)
      .then(function (user) {
        if (user.authenticate(oldPass)) {
          user.password = newPass;
          return user.save()
            .then(function () {
              res.status(204).end();
            })
            .catch(validationError(res));
        } else {
          return res.status(403).end();
        }
      });
  }

  /**
   * Get my info
   */
  function me(req, res, next) {
    var userId = req.user._id;

    User.findOne({_id: userId}, '-salt -password')
      .then(function (user) { // don't ever give out the password or salt
        if (!user) {
          return res.status(401).end();
        }
        res.json(user);
      })
      .catch(function (err) {
        return next(err);
      });
  }

  /**
   * Authentication callback
   */
  function authCallback(req, res, next) {
    res.redirect('/');
  }

  /**
   * Creates a new user
   */
  function create(auth) {
    return function (req, res, next) {
      var newUser = new User(req.body);
      newUser.provider = 'local';
      newUser.role = 'user';
      newUser.save()
        .spread(function (user) {
          var token = auth.signToken(user._id, user.role);
          res.json({token: token});
        })
        .catch(validationError(res));
    }
  }
};