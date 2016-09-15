'use strict';

var Promise = require('bluebird');
var log = require('log4js').getLogger('token');

export = controllerFactory;

function controllerFactory(token){
  return {
    token: tokenVerify
  };

  function tokenVerify(req, res) {
    return Promise.resolve()
      .then(function(){
        return token.verify(req.params.token);
      })
      //.then(responseWithResult(res))
      .then(redirect())
      .catch(handleError(res));

    function redirect(){
      res.redirect('/');
    }
  }
}

function handleError(res, statusCode = 500) {
  return function(err) {
    log.error(err);
    res.status(statusCode).send(err);
  };
}

function responseWithResult(res, statusCode = 200) {
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}
