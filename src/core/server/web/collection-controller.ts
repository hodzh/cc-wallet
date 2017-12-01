import { RouteController } from './controller';

export class RouteControllerCollection extends RouteController {

  constructor(public model) {
    super();
  }

  // Gets a list of object
  async indexPage(req, res) {
    const data = await this.model.query(req.body.query || {}, {
      page: req.query.page,
      limit: req.query.limit,
    });
    this.responseWithResult(res, data);
  }

// Gets a list of object
  async index(req, res) {
    const data = await this.model.find({}).exec();
    this.responseWithResult(res, data);
  }

// Gets a single object from the DB
  async show(req, res) {
    const data = await this.model.findById(req.params.id);
    this.handleEntityNotFound(res, data);
    this.responseWithResult(res, data);
  }

// Creates a new object in the DB
  async create(req, res) {
    const data = await this.model.create(req.body);
    this.responseWithResult(res, data, 201);
  }

// Updates an existing object in the DB
  async update(req, res) {
    if (req.body._id) {
      delete req.body._id;
    }
    const data = await this.model.findById(req.params.id);
    this.handleEntityNotFound(res, data);
    data.merge(req.body);
    await data.save();
    this.responseWithResult(res, data);
  }

// Deletes a object from the DB
  async destroy(req, res) {
    const data = await this.model.findById(req.params.id);
    this.handleEntityNotFound(res, data);
    await data.remove();
    res.status(204).end();
  }
}
