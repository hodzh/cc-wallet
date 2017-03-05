import Recaptcha = require('../../../captcha/recaptcha');

import * as Promise from 'bluebird';
var log = require('log4js').getLogger('token');
import controller = require('../../../web/controller');
import User = require('../../../model/user');

export = controllerFactory;

function controllerFactory(token, mail) {

  token.on('confirmEmail', confirmEmail);

  return {
    create: create,
    changePassword: changePassword,
    resetPassword: resetPassword,
    me: me,
    emailVerify: emailVerify
  };

  /**
   * Change a users password
   */
  function changePassword(req, res, next) {
    return Promise.resolve()
      .then(() => {
        var userId = req.user._id;
        return User.findById(userId);
      })
      .then(user => {
        var oldPass = String(req.body.oldPassword);
        var newPass = String(req.body.newPassword);
        if (user.authenticate(oldPass)) {
          user.password = newPass;
          return user.save()
            .then(() => {
              res.status(204).end();
            })
            .catch(validationError(res));
        } else {
          return res.status(403).end();
        }
      })
      .catch(controller.handleError(res));
  }

  /**
   * Get my info
   */
  function me(req, res, next) {

    return Promise.resolve()
      .then(() => {
        var userId = req.user._id;
        return User.findOne({_id: userId}, '-salt -password');
      })
      .then(user => {
        if (!user) {
          return res.status(401).end();
        }
        // don't ever give out the password or salt
        res.json(user.sanitize());
      })
      .catch(err => next(err));
  }

  /**
   * Creates a new user
   */
  function create(auth) {
    return function (req, res, next) {
      return Promise.resolve()
        .then(() => Recaptcha.RecaptchaService.verify(req))
        .then(() => {
          var user = new User({
            email: req.body.email,
            password: req.body.password,
            provider: 'local',
            role: auth.isEmailVerify() ? 'applicant' : 'user',
            emailVerify: new Date(),
            resetPassword: new Date()
          });
          return user.save();
        })
        .then(user => {
          var code = auth.signToken(user._id, user.role);
          res.json({
            token: code,
            user: user.sanitize()
          });
          return user;
        })
        .then(user => {
          sendConfirmEmail(auth, user, true)
            .catch((err) => {
              log.error(err);
            });
        })
        .catch(err => {
          log.error(err);
          validationError(res);
        });
    };
  }

  /**
   * Reset a user password
   */
  function resetPassword(auth) {
    return function (req, res, next) {
      var user;
      return Promise.resolve()
        .then(() => Recaptcha.RecaptchaService.verify(req))
        .then(() => User.find({
          email: req.body.email
        }))
        .then(() => {
          if (user.resetPassword) {
            const resetPasswordInterval = 60 /*min*/;
            var nextTime = user.resetPassword.getTime() +
              resetPasswordInterval * 60 * 1000;
            if (nextTime > Date.now()) {
              return;
            }
          }

          // create verification code
          var code = token.create({
            type: 'resetPassword',
            user: user._id
          });

          // send email with code
          return mail.send({
            to: user.email
          }, 'resetPassword', {
            token: code
          });
        })
        .catch(controller.handleError(res));
    };
  }

  function emailVerify(auth) {
    return function (req, res, next) {
      return Promise.resolve()
        .then(() => sendConfirmEmail(auth, req.user, false))
        .then(user => {
          res.json({
            emailVerify: req.user.emailVerify
          });
          return user;
        })
        .catch(controller.handleError(res));
    };
  }

  function validationError(res, statusCode = 422) {
    return err => {
      res.status(statusCode).json(err);
    };
  }

  function sendConfirmEmail(auth, user, firstTime) {
    if (!auth.isEmailVerify()) {
      return;
    }
    if (user.role !== 'applicant') {
      return;
    }
    if (!user.emailVerify) {
      return;
    }
    if (!firstTime) {
      const emailVerifyInterval = 10 /*min*/;
      var nextTime = user.emailVerify.getTime() +
        emailVerifyInterval * 60 * 1000;
      if (nextTime > Date.now()) {
        return;
      }
    }

    return Promise.resolve()
      .then(() => {
        if (firstTime) {
          return;
        }
        user.emailVerify = new Date();
        return user.save();
      })
      .then(() => {
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
      });
  }

  function confirmEmail(token) {
    return Promise.resolve()
      .then(() => User.update({
        _id: token.user,
        role: 'applicant'
      }, {
        $set: {
          role: 'user'
        }
      }))
      .then(result => {
        if (!result || !result.nModified) {
          log.error('fail to confirm email');
        }
      })
      .catch(err => {
        log.error(err);
      });
  }
}
