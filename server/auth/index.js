'use strict';

var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
var compose = require('composable-middleware');

var config = require('../../config');
var User = require('../model/user.js');

var validateJwt = expressJwt({
  secret: config.web.jwt.secret
});

module.exports = {
  isAuthenticated : isAuthenticated,
  hasRole : hasRole,
  signToken : signToken
};

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
      User.findByIdAsync(req.user._id)
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
 */
function hasRole(roleRequired) {
  if (!roleRequired) {
    throw new Error('Required role needs to be set');
  }

  return compose()
    .use(isAuthenticated())
    .use(meetsRequirements);

  function meetsRequirements(req, res, next) {
    if (config.shared.appConfig.userRoles.indexOf(req.user.role) >=
      config.shared.appConfig.userRoles.indexOf(roleRequired)) {
      next();
    }
    else {
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
    config.web.jwt.secret,
    {
      expiresIn: config.web.jwt.expiresIn
    });
}