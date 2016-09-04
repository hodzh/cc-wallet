'use strict';

var Promise = require('bluebird');
var log = require('log4js').getLogger('token');
var jwt = require('jsonwebtoken');

var User = require('../../../model/user');

export = controllerFactory;

function controllerFactory(token, mail) {

  token.on('confirmEmail', confirmEmail);

  return {
    create: create,
    changePassword: changePassword,
    me: me
  };

  /**
   * Change a users password
   */
  function changePassword(req, res, next) {
    return Promise.resolve()
      .then(function(){
        var userId = req.user._id;
        return User.findById(userId);
      })
      .then(function (user) {
        var oldPass = String(req.body.oldPassword);
        var newPass = String(req.body.newPassword);
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
      })
      .catch(handleError(res));
  }

  /**
   * Get my info
   */
  function me(req, res, next) {

    return Promise.resolve()
      .then(function(){
        var userId = req.user._id;
        return User.findOne({_id: userId}, '-salt -password');
      })
      .then(function (user) {
        if (!user) {
          return res.status(401).end();
        }
        // don't ever give out the password or salt
        res.json(user.sanitize());
      })
      .catch(function (err) {
        return next(err);
      });
  }

  /**
   * Creates a new user
   */
  function create(auth) {
    return function (req, res, next) {
      var user;
      return Promise.resolve()
        .then(function(){
          var newUser = new User(req.body);
          newUser.provider = 'local';
          newUser.role = 'user';
          user = newUser;
          return newUser.save();
        })
        .spread(function (user) {
          var code = auth.signToken(user._id, user.role);
          res.json({token: code});
          return user;
        })
        .catch(validationError(res))
        .then(function () {
          if (!auth.isEmailVerify()) {
            return;
          }
          // create verification code
          var code = token.create({
            type: 'confirmEmail',
            user: user._id
          });
          // send email with code
          return mail.send({
            to: user.email
          }, 'confirmEmail', {
            token: code
          });
        })
        .catch(function(err) {
          log.error(err);
        });
    };
  }

  function validationError(res, statusCode = 422) {
    return function (err) {
      res.status(statusCode).json(err);
    }
  }

  function handleError(res, statusCode = 500) {
    return function (err) {
      res.status(statusCode).send(err);
    };
  }

  function confirmEmail(token){
    return Promise.resolve()
      .then(function() {
        return User.update({
          _id: token.user
        }, {
          $set: {
            emailValid: true
          }
        });
      })
      .then(function (result) {
        if (!result || !result.nModified) {
          log.error('fail to confirm email');
        }
      })
      .catch(function (err) {
        log.error('fail to confirm email');
      });
  }
}
