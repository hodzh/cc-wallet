var crypto = require('crypto');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var authTypes = ['github', 'twitter', 'facebook', 'google'];

var schema = new Schema({
  name: String,
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: true,
    mergeable: false
  },
  emailVerify: Date,
  resetPassword: Date,
  role: {
    type: String,
    required: true,
    mergeable: false
  },
  password: { type: String, mergeable: false },
  provider: { type: String, mergeable: false },
  salt: { type: String, mergeable: false },
}, {
  collection: 'user'
});

/**
 * Virtuals
 */

// Non-sensitive info we'll be putting in the token
schema
  .virtual('token')
  .get(getToken);

/**
 * Validations
 */

// Validate empty email
schema
  .path('email')
  .validate(validateEmail, 'Email cannot be blank');

// Validate empty password
schema
  .path('password')
  .validate(validatePassword,
    'Password cannot be blank');

// Validate email is not taken
schema
  .path('email')
  .validate(validateEmailAlreadyInUse,
    'The specified email address is already in use.');

/**
 * Pre-save hook
 */
schema
  .pre('save', beforeSave);

/**
 * Methods
 */
schema.methods = {
  authenticate: authenticate,
  makeSalt: makeSalt,
  encryptPassword: encryptPassword,
  sanitize: sanitize
};

schema.statics.addUser = async function(model) {
  const User = this;
  await User.remove({
    email: model.email
  });
  const user = new User(model);
  return await user.save();
};

schema.plugin(require('../db/query-plugin'));
schema.plugin(require('../../../core/server/db/created-plugin'));
schema.plugin(require('../../../core/server/db/updated-plugin'));

export = mongoose.model('User', schema);

/**
 * returns only non secret data
 */
function sanitize() {
  return {
    _id: this._id.toString(),
    email: this.email,
    role: this.role
  };
}

function getToken() {
  return {
    _id: this._id,
    role: this.role
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
  return this.constructor.findOne({email: value})
    .then(function (user) {
      if (user) {
        if (self.id === user.id) {
          return respond(true);
        }
        return respond(false);
      }
      return respond(true);
    })
    .catch(function (err) {
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
      return callback(err);
    }

    if (_this.password === pwdGen) {
      callback(null, true);
    } else {
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
  } else if (typeof arguments[1] === 'function') {
    callback = arguments[1];
  }

  if (!byteSize) {
    byteSize = defaultByteSize;
  }

  if (!callback) {
    return crypto.randomBytes(byteSize).toString('base64');
  }

  return crypto.randomBytes(byteSize, function (err, salt) {
    if (err) {
      return callback(err);
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

  const defaultIterations = 10000;
  const defaultKeyLength = 512;
  const defaultDigest = 'sha512';

  const salt = new Buffer(this.salt, 'base64');

  if (!callback) {
    return crypto.pbkdf2Sync(
      password,
      salt,
      defaultIterations,
      defaultKeyLength,
      defaultDigest)
      .toString('base64');
  }

  return crypto.pbkdf2(
    password,
    salt,
    defaultIterations,
    defaultKeyLength,
    defaultDigest,
    onEncrypt);

  function onEncrypt(err, key) {
    if (err) {
      return callback(err);
    }
    return callback(null, key.toString('base64'));
  }
}
