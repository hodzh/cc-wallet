import { RouteController } from '../../../../../core/server/web/controller';

export class CurrencyController extends RouteController {
  constructor(private config) {
    super();
  }

  async index(req, res) {
    res.json(Object.keys(this.config.currency)
      .map(key => this.config.currency[key]));
  }
}
