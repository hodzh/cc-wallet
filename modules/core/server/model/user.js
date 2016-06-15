'use strict';

var crypto = require('crypto');
var Promise = require('bluebird');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var authTypes = ['github', 'twitter', 'facebook', 'google'];

var UserSchema = new Schema({
  name: String,
  email: {
    type: String,
    lowercase: true,
    unique: true,
    require: true
  },
  role: {
    type: String,
    default: 'user',
    require: true
  },
  password: String,
  provider: String,
  salt: String,
  facebook: {},
  twitter: {},
  google: {},
  github: {}
});

/**
 * Virtuals
 */

// Public profile information
UserSchema
    .virtual('profile')
    .get(getProfile);

// Non-sensitive info we'll be putting in the token
UserSchema
  .virtual('token')
  .get(getToken);

/**
 * Validations
 */

// Validate empty email
UserSchema
  .path('email')
  .validate(validateEmail, 'Email cannot be blank');

// Validate empty password
UserSchema
  .path('password')
  .validate(validatePassword,
    'Password cannot be blank');

// Validate email is not taken
UserSchema
  .path('email')
  .validate(validateEmailAlreadyInUse,
    'The specified email address is already in use.');

/**
 * Pre-save hook
 */
UserSchema
  .pre('save', beforeSave);

/**
 * Methods
 */
UserSchema.methods = {
  authenticate: authenticate,
  makeSalt: makeSalt,
  encryptPassword: encryptPassword
};

module.exports = mongoose.model('User', UserSchema);

function getProfile() {
  return {
    'name': this.name,
    'role': this.role
  };
}

function getToken() {
  return {
    '_id': this._id,
    'role': this.role
  };
}

function validateEmail(email) {
  if (authTypes.indexOf(this.provider) !== -1) {
    return true;
  }
  return email.length;
}

function validatePassword(password) {
  if (authTypes.indexOf(this.provider) !== -1) {
    return true;
  }
  return password.length;
}

function validateEmailAlreadyInUse(value, respond) {
  var self = this;
  return this.constructor.findOne({ email: value })
    .then(function(user) {
      if (user) {
        if (self.id === user.id) {
          return respond(true);
        }
        return respond(false);
      }
      return respond(true);
    })
    .catch(function(err) {
      throw err;
    });
}

function validatePresenceOf(value) {
  return value && value.length;
}

function beforeSave(next) {

  // update name if not specified
  if (this.isNew) {
    if (!this.name && this.email) {
      this.name = this.email.split('@')[0];
    }
  }
  // Handle new/update passwords
  if (this.isModified('password')) {
    if (!validatePresenceOf(this.password) &&
      authTypes.indexOf(this.provider) === -1) {
      return next(new Error('Invalid password'));
    }

    // Make salt with a callback
    var _this = this;
    this.makeSalt(onMakeSalt);
  } else {
    return next();
  }

  function onMakeSalt(saltErr, salt) {
    if (saltErr) {
      next(saltErr);
    }
    _this.salt = salt;
    _this.encryptPassword(_this.password, onEncryptPassword);
  }

  function onEncryptPassword(encryptErr, hashedPassword) {
    if (encryptErr) {
      next(encryptErr);
    }
    _this.password = hashedPassword;
    next();
  }
}

/**
 * Authenticate - check if the passwords are the same
 *
 * @param {String} password
 * @param {Function} callback
 * @return {Boolean}
 * @api public
 */
function authenticate(password, callback) {
  if (!callback) {
    return this.password === this.encryptPassword(password);
  }

  var _this = this;
  this.encryptPassword(password, onEncrypt);

  function onEncrypt(err, pwdGen) {
    if (err) {
      callback(err);
    }

    if (_this.password === pwdGen) {
      callback(null, true);
    }
    else {
      callback(null, false);
    }
  }
}

/**
 * Make salt
 *
 * @param {Number} byteSize Optional salt byte size, default to 16
 * @param {Function} callback
 * @return {String}
 * @api public
 */
function makeSalt(byteSize, callback) {
  var defaultByteSize = 16;

  if (typeof arguments[0] === 'function') {
    callback = arguments[0];
    byteSize = defaultByteSize;
  }
  else if (typeof arguments[1] === 'function') {
    callback = arguments[1];
  }

  if (!byteSize) {
    byteSize = defaultByteSize;
  }

  if (!callback) {
    return crypto.randomBytes(byteSize).toString('base64');
  }

  return crypto.randomBytes(byteSize, function(err, salt) {
    if (err) {
      callback(err);
    }
    return callback(null, salt.toString('base64'));
  });
}

/**
 * Encrypt password
 *
 * @param {String} password
 * @param {Function} callback
 * @return {String}
 * @api public
 */
function encryptPassword(password, callback) {
  if (!password || !this.salt) {
    return null;
  }

  var defaultIterations = 10000;
  var defaultKeyLength = 64;
  var salt = new Buffer(this.salt, 'base64');

  if (!callback) {
    return crypto.pbkdf2Sync(
      password,
      salt,
      defaultIterations,
      defaultKeyLength)
      .toString('base64');
  }

  return crypto.pbkdf2(
    password,
    salt,
    defaultIterations,
    defaultKeyLength,
    onEncrypt);

  function onEncrypt(err, key) {
    if (err) {
      callback(err);
    }
    return callback(null, key.toString('base64'));
  }
}