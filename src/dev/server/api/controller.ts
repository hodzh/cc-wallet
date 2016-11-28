var Promise = require('bluebird');
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
      .map(model => {
        return Promise.resolve()
          .then(() => {
            return User.remove({
              email: model.email
            });
          })
          .then(() => {
            let user = new User(model);
            return user.save().catch(error => console.error(error));
          });
      }))
      .then(() => true)
      .then(controller.responseWithResult(res))
      .catch(controller.handleError(res));
  }
}

export = DevDbController;
