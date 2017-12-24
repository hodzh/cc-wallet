import { RouteControllerCollection } from './collection-controller';

export class RouteControllerUserCollection extends RouteControllerCollection {

  constructor(public model) {
    super(model);
  }

  onQuery(req, query) {
    query.owner = req.user._id;
  }

  onCreate(req, query) {
    query.owner = req.user._id;
  }

  sanitize(data) {
    let sData = super.sanitize(data);
    delete sData.owner;
    return sData;
  }
}
