var controller = require('../../../core/server/web/controller');
var mongoose = require('mongoose');
var User = require('../../../core/server/model/user');

class DevDbController {
  constructor(private config) {
  }

  clearAll(req, res) {
    return Promise.all(Object.keys(mongoose.models)
      .map(model => mongoose.models[model].remove()))
      .then(() => true)
      .then(controller.responseWithResult(res))
      .catch(controller.handleError(res));
  }

  addUsers(req, res) {
    return Promise.all(this.config.users
      .map(model => User.addUser(model)))
      .then(() => true)
      .then(controller.responseWithResult(res))
      .catch(controller.handleError(res));
  }
}

export = DevDbController;
