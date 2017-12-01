import { RouteController } from './controller';

export class RouteControllerUserCollection extends RouteController {

  constructor(public model) {
    super();
  }

  // Gets a list of object
  async indexPage(req, res) {
    const data = await this.model.query({
      owner: req.user._id,
    }, {
      page: req.query.page,
      limit: req.query.limit,
    });
    this.responseWithResult(res, data);
  }

// Gets a list of object
  async index(req, res) {
    const data = await this.model.find({
      owner: req.user._id,
    }).exec();
    this.responseWithResult(res, data);
  }

// Gets a single object from the DB
  async show(req, res) {
    const data = await this.model.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });
    this.handleEntityNotFound(res, data);
    this.responseWithResult(res, data);
  }

// Creates a new object in the DB
  async create(req, res) {
    let newObject = Object.assign(req.body);
    newObject.owner = req.user._id;
    const data = await this.model.create(newObject);
    this.responseWithResult(res, data, 201);
  }

// Updates an existing object in the DB
  async update(req, res) {
    if (req.body._id) {
      delete req.body._id;
    }
    const data = await this.model.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });
    this.handleEntityNotFound(res, data);
    data.merge(res.body);
    await data.save();
    this.responseWithResult(res, data);
  }

// Deletes a object from the DB
  async destroy(req, res) {
    const data = await this.model.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });
    this.handleEntityNotFound(res, data);
    await data.remove();
    res.status(204).end();
  }
}
