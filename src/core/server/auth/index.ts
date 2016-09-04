'use strict';

var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
var compose = require('composable-middleware');

var config;
var User;
var validateJwt;

export = {
  init: init,
  isAuthenticated : isAuthenticated,
  hasRole : hasRole,
  signToken : signToken,
  isEmailVerify: isEmailVerify
};

function init(userModel, appConfig) {
  User = userModel;
  config = appConfig;
  validateJwt = expressJwt({
    secret: config.auth.jwt.secret
  });
  var authSetup = require('./setup');
  authSetup(userModel, config);
}

/**
 * Attaches the user object to the request if authenticated
 * Otherwise returns 403
 */
function isAuthenticated() {
  return compose()
  // Validate jwt
    .use(function(req, res, next) {
      // allow access_token to be passed through query parameter as well
      if (req.query && req.query.hasOwnProperty('access_token')) {
        req.headers.authorization = 'Bearer ' + req.query.access_token;
      }
      validateJwt(req, res, next);
    })
    // Attach user to request
    .use(function(req, res, next) {
      User.findById(req.user._id)
        .then(function(user) {
          if (!user) {
            return res.status(401).end();
          }
          req.user = user;
          next();
        })
        .catch(function(err) {
          return next(err);
        });
    });
}

/**
 * Checks if the user role meets the minimum requirements of the route
 * @param roleRequired {String}
 * @returns {*}
 */
function hasRole(roleRequired) {
  return compose()
    .use(isAuthenticated())
    .use(meetsRequirements);

  function meetsRequirements(req, res, next) {
    // check application config
    if (!roleRequired ||
      config.auth.role.indexOf(roleRequired) === -1) {
      return forbidden();
    }
    // admin suits any role
    if (req.user.role == 'admin' &&
      config.auth.role.indexOf('admin') !== -1) {
      return next();
    }

    // check user role
    if (req.user.role != roleRequired) {
      return forbidden();
    }

    // user email should be valid
    if (config.auth.local.verify &&
        req.user.role == 'user' &&
        req.user.provider == 'local' &&
        !req.user.emailValid) {
      return forbidden();
    }

    // success auth
    return next();

    /**
     * auth has failed
     */
    function forbidden() {
      res.status(403).send('Forbidden');
    }
  }
}

/**
 * Returns a jwt token signed by the app secret
 */
function signToken(id, role) {
  return jwt.sign(
    {
      _id: id,
      role: role
    },
    config.auth.jwt.secret,
    {
      expiresIn: config.auth.jwt.expiresIn
    });
}

function isEmailVerify(){
  return config.auth.local.verify;
}
