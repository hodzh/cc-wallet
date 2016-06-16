var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var errorMessage = 'Incorrect email or password.';

function localAuthenticate(User, email, password, done) {
  User.findOne({
      email: email.toLowerCase()
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

exports.setup = function(User, config) {
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  }, function(email, password, done) {
    return localAuthenticate(User, email, password, done);
  }));
};
