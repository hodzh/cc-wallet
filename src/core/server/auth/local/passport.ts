var Promise = require('bluebird');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var errorMessage = 'Incorrect email or password.';

/**
 * Find the user by email, validate password
 * @param User {Object} user collection model
 * @param email {String} user email
 * @param password {String} user password
 * @param done {Function} callback
 */
function localAuthenticate(User, email, password, done) {
  return Promise.resolve()
    .then(function() {
      return User.findOne({
        email: email.trim().toLowerCase()
      });
    })
    .then(function(user) {
      if (!user) {
        // This email is not registered.
        return done(null, false, {
          message: errorMessage
        });
      }
      user.authenticate(password, function(authError, authenticated) {
        if (authError) {
          return done(authError);
        }
        if (!authenticated) {
          // This password is not correct.
          return done(null, false, {
            message: errorMessage
          });
        } else {
          return done(null, user);
        }
      });
    })
    .catch(function(err) {
      return done(err);
    });
}

export = { setup: setup };

function setup(User, config) {
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  }, function(email, password, done) {
    return localAuthenticate(User, email, password, done);
  }));
}
