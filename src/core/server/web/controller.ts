import { ValidateError } from '../validate/validate-error';
import { HttpError } from './http-error';

let log = require('log4js').getLogger('web');

export class RouteController {
  constructor() {
  }

  handleError(res, err, statusCode?) {
    if (err instanceof ValidateError) {
      res.status(statusCode || 422).json({
        messages: err.messages,
      });
      return;
    }
    if (err instanceof HttpError) {
      res.status(err.status || statusCode || 500).json({
        message: err.message,
      });
      return;
    }
    log.error('handle error', err);
    res.status(statusCode || 500).json({
      message: err.message,
    });
  }

  responseWithResult(res, data, statusCode: number = 200) {
    res.status(statusCode).json(data);
  }

  handleEntityNotFound(res, data) {
    if (!data) {
      throw new HttpError('not found', 404);
    }
  }

  checkOwner(req, data) {
    if (data.owner.toString() !== req.user._id.toString()) {
      throw new HttpError('not found', 404);
    }
  }

  route(handler) {
    return (req, res) => {
      handler.call(this, req, res)
        .catch((error) => {
          this.handleError(res, error);
        });
    };
  }
}
