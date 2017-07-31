import Ajv = require('ajv');
import { ValidateError } from '../validate/validate-error';
let log = require('log4js').getLogger('web');

export = {
  handleError: handleError,
  responseWithResult: responseWithResult,
  handleEntityNotFound: handleEntityNotFound,
  checkOwner: checkOwner
};

function handleError(res, statusCode?) {
  return function (err) {
    if (err instanceof ValidateError) {
      res.status(statusCode || 422).json({
        messages: err.messages,
      });
      return;
    }
    log.error('handle error', err);
    res.status(statusCode || 500).json({
      message: err.message,
    });
  };
}

function responseWithResult(res, statusCode = 200) {
  return function (entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function handleEntityNotFound(res) {
  return function (entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function checkOwner(req) {
  return function (entity) {
    if (!entity) {
      return null;
    }
    if (entity.owner.toString() !== req.user._id.toString()) {
      return null;
    }
    return entity;
  };
}
