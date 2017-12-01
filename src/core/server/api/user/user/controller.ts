import Recaptcha = require('../../../captcha/recaptcha');
import User = require('../../../model/user');

let log = require('log4js').getLogger('token');
import { Validator } from '../../../validate/index';
import {
  MAX_PASSWORD_LENGTH,
  MIN_PASSWORD_LENGTH,
} from '../../../../common/validate';
import { RouteController } from '../../../web/controller';

let emailSchema = {
  type: 'string',
  format: 'email',
};
let passwordSchema = {
  type: 'string',
  maxLength: MAX_PASSWORD_LENGTH,
  minLength: MIN_PASSWORD_LENGTH,
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

export class UserController extends RouteController {

  constructor(public tokenService, public mail, public auth) {
    super();
    tokenService.on('confirmEmail', (params) => this.confirmEmail(params));
  }

  /**
   * Change a users password
   */
  async changePassword(req, res) {
    await Validator.validate('changePassword', req.body);
    let userId = req.user._id;
    const user = await User.findById(userId);
    let oldPass = String(req.body.oldPassword);
    let newPass = String(req.body.password);
    if (user.authenticate(oldPass)) {
      user.password = newPass;
      await user.save();
      res.status(204).end();
    } else {
      return res.status(403).end();
    }
  }

  /**
   * Get my info
   */
  async me(req, res) {
    let userId = req.user._id;
    const user = await User.findOne({_id: userId}, '-salt -password');
    if (!user) {
      return res.status(401).end();
    }
    // don't ever give out the password or salt
    res.json(user.sanitize());
  }

  /**
   * Creates a new user
   */
  async create(req, res) {
    await Recaptcha.RecaptchaService.verify(req);
    await Validator.validate('createUser', req.body);
    let user = new User({
      email: req.body.email,
      password: req.body.password,
      provider: 'local',
      role: this.auth.isEmailVerify() ? 'applicant' : 'user',
      emailVerify: new Date(),
      resetPassword: new Date(),
    });
    await user.save();
    let code = this.auth.signToken(user._id, user.role);
    res.json({
      token: code,
      user: user.sanitize(),
    });
    await this.sendConfirmEmail(user, true)
      .catch((err) => {
        log.error(err);
      });
  }

  /**
   * Reset a user password
   */
  async resetPassword(req, res) {
    this.responseWithResult(res, true);
    try {
      await Validator.validate('resetPassword', req.body);
      const user = await User.findOne({
        email: req.body.email,
      });
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
      let code = this.tokenService.create({
        type: 'resetPassword',
        user: user._id.toString(),
      });

      // send email with code
      await this.mail.send({
        options: {
          to: user.email,
        },
        key: 'resetPassword',
        context: {
          token: code,
        },
      });
    } catch (err) {
      log.error(err);
    }
  }

  /**
   * Set a user password
   */
  async setPassword(req, res) {
    await Validator.validate('setPassword', req.body);
    let token = req.body.token;
    if (!token) {
      throw new Error('undefined token');
    }
    await this.tokenService.verify(token);
    if (token.type !== 'resetPassword') {
      throw new Error('bad token type');
    }
    const user = await User.findById(token.user);
    if (!user) {
      throw new Error('bad user id');
    }
    user.password = req.body.password;
    await user.save();
    this.responseWithResult(res, true);
  }

  async emailVerify(req, res) {
    await this.sendConfirmEmail(req.user, false);
    res.json({
      emailVerify: req.user.emailVerify,
    });
  }

  async sendConfirmEmail(user, firstTime) {
    if (!this.auth.isEmailVerify()) {
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

    if (firstTime) {
      return;
    }
    user.emailVerify = new Date();
    await user.save();
    // create verification code
    let code = this.tokenService.create({
      type: 'confirmEmail',
      user: user._id,
    });
    // send email with code
    this.mail.send({
      options: {
        to: user.email,
      },
      key: 'confirmEmail',
      context: {
        token: code,
      },
    });
  }

  async confirmEmail(token) {
    const result = await User.update({
      _id: token.user,
      role: 'applicant',
    }, {
      $set: {
        role: 'user',
      },
    });
    if (!result || !result.nModified) {
      log.error('fail to confirm email');
    }
  }
}
