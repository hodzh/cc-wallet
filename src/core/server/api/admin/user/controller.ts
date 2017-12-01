import User = require('../../../model/user');
import { RouteControllerCollection } from '../../../web/collection-controller';

export class AdminUserConfigController extends RouteControllerCollection {
  constructor() {
    super(User);
  }

  async create(req, res) {
    let newUser = new User(req.body);
    newUser.provider = 'local';
    newUser.role = 'user';
    await newUser.save()
    res.json(newUser.sinitize());
  }
}
