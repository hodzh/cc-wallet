import Recaptcha = require('../../../captcha/recaptcha');
let log = require('log4js').getLogger('token');
import controller = require('../../../web/controller');
import User = require('../../../model/user');
import { Validator } from '../../../validate/index';
import {
  MAX_PASSWORD_LENGTH,
  MIN_PASSWORD_LENGTH
} from '../../../../common/validate';

let emailSchema = {
  type: 'string',
  format: 'email',
};
let passwordSchema = {
  type: 'string',
  maxLength: MAX_PASSWORD_LENGTH,
  minLength: MIN_PASSWORD_LENGTH
};
let tokenSchema = {
  type: 'string',
  format: 'jsonwebtoken',
};

const changePasswordSchema = {
  $async: true,
  additionalProperties: false,
  properties: {
    password: passwordSchema,
    oldPassword: passwordSchema,
  },
  required: ['password', 'oldPassword'],
};
Validator.addSchema(changePasswordSchema, 'changePassword');

const createUserSchema = {
  $async: true,
  additionalProperties: false,
  properties: {
    email: emailSchema,
    password: passwordSchema,
  },
  required: ['password', 'email'],
};
Validator.addSchema(createUserSchema, 'createUser');

const resetPasswordSchema = {
  $async: true,
  additionalProperties: false,
  properties: {
    email: emailSchema,
  },
  required: ['email'],
};
Validator.addSchema(resetPasswordSchema, 'resetPassword');

const setPasswordSchema = {
  $async: true,
  additionalProperties: false,
  properties: {
    token: tokenSchema,
    password: passwordSchema,
  },
  required: ['password', 'token'],
};
Validator.addSchema(setPasswordSchema, 'setPassword');

export = controllerFactory;

function controllerFactory(tokenService, mail, auth) {

  tokenService.on('confirmEmail', confirmEmail);

  return {
    create: create,
    changePassword: changePassword,
    resetPassword: resetPassword,
    setPassword: setPassword,
    me: me,
    emailVerify: emailVerify
  };

  /**
   * Change a users password
   */
  function changePassword(req, res) {
    return Promise.resolve()
      .then(() => {
        return Validator.validate('changePassword', req.body);
      })
      .then(() => {
        let userId = req.user._id;
        return User.findByOrderNumber(userId);
      })
      .then(user => {
        let oldPass = String(req.body.oldPassword);
        let newPass = String(req.body.password);
        if (user.authenticate(oldPass)) {
          user.password = newPass;
          return user.save()
            .then(() => {
              res.status(204).end();
            })
            .catch(controller.handleError(res));
        } else {
          return res.status(403).end();
        }
      })
      .catch(controller.handleError(res));
  }

  /**
   * Get my info
   */
  function me(req, res) {

    return Promise.resolve()
      .then(() => {
        let userId = req.user._id;
        return User.findOne({_id: userId}, '-salt -password');
      })
      .then(user => {
        if (!user) {
          return res.status(401).end();
        }
        // don't ever give out the password or salt
        res.json(user.sanitize());
      })
      .catch(controller.handleError(res));
  }

  /**
   * Creates a new user
   */
  function create(req, res) {
    return Promise.resolve()
      .then(() => Recaptcha.RecaptchaService.verify(req))
      .then(() => {
        return Validator.validate('createUser', req.body);
      })
      .then(() => {
        let user = new User({
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
        let code = auth.signToken(user._id, user.role);
        res.json({
          token: code,
          user: user.sanitize()
        });
        return user;
      })
      .then(user => {
        sendConfirmEmail(user, true)
          .catch((err) => {
            log.error(err);
          });
      })
      .catch(controller.handleError(res));
  }

  /**
   * Reset a user password
   */
  function resetPassword(req, res) {
    return Promise.resolve()
    // .then(() => Recaptcha.RecaptchaService.verify(req))
      .then(() => true)
      .then(controller.responseWithResult(res))
      .then(() => {
        return Validator.validate('resetPassword', req.body);
      })
      .then(() => User.findOne({
        email: req.body.email
      }))
      .then((user) => {
        if (!user) {
          return;
        }
        if (user.resetPassword) {
          const resetPasswordInterval = 60 /*min*/;
          let nextTime = user.resetPassword.getTime() +
            resetPasswordInterval * 60 * 1000;
          if (nextTime > Date.now()) {
            return;
          }
        }

        // create verification code
        let code = tokenService.create({
          type: 'resetPassword',
          user: user._id.toString(),
        });

        // send email with code
        return mail.send({
          options: {
            to: user.email
          },
          key: 'resetPassword',
          context: {
            token: code
          }
        });
      })
      .catch((err) => {
        log.error(err);
      });
  }

  /**
   * Set a user password
   */
  function setPassword(req, res) {
    return Promise.resolve()
      .then(() => {
        return Validator.validate('setPassword', req.body);
      })
      .then(() => {
        let token = req.body.token;
        if (!token) {
          throw new Error('undefined token');
        }
        return tokenService.verify(token);
      })
      .then(token => {
        if (token.type !== 'resetPassword') {
          throw new Error('bad token type');
        }
        return token;
      })
      .then((token) => User.findByOrderNumber(token.user))
      .then((user) => {
        if (!user) {
          throw new Error('bad user id');
        }
        user.password = req.body.password;
        return user.save();
      })
      .then(() => true)
      .then(controller.responseWithResult(res))
      .catch(controller.handleError(res));
  }

  function emailVerify(req, res) {
    return Promise.resolve()
      .then(() => sendConfirmEmail(req.user, false))
      .then(user => {
        res.json({
          emailVerify: req.user.emailVerify
        });
        return user;
      })
      .catch(controller.handleError(res));
  }

  function sendConfirmEmail(user, firstTime) {
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
      let nextTime = user.emailVerify.getTime() +
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
        let code = tokenService.create({
          type: 'confirmEmail',
          user: user._id
        });
        // send email with code
        return mail.send({
          options: {
            to: user.email
          },
          key: 'confirmEmail',
          context: {
            token: code
          }
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
