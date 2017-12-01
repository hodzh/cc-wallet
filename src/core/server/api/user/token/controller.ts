import { RouteController } from '../../../web/controller';

var log = require('log4js').getLogger('token');

export class TokenController extends RouteController {

  constructor(public token) {
    super();
  }

  async tokenVerify(req, res) {
    await this.token.verify(req.params.token);
    res.redirect('/');
  }
}
