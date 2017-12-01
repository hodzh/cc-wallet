import { RouteController } from '../../../core/server/web/controller';

var mongoose = require('mongoose');
var User = require('../../../core/server/model/user');

export class DevDbController extends RouteController {
  constructor(private config) {
    super();
  }

  async clearAll(req, res) {
    await Promise.all(Object.keys(mongoose.models)
      .map(model => mongoose.models[model].remove()));
    this.responseWithResult(res, true);
  }

  async addUsers(req, res) {
    await Promise.all(this.config.users
      .map(model => User.addUser(model)));
    this.responseWithResult(res, true);
  }
}

