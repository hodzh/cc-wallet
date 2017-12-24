import { RouteController } from './controller';

export class RouteControllerCollection extends RouteController {

  constructor(public model) {
    super();
  }

  // Gets a list of object
  async indexPage(req, res) {
    const query = req.body.query || {};
    this.onQuery(req, query);
    const data = await this.model.query(query, {
      page: req.query.page,
      limit: req.query.limit,
    });
    data.docs = data.docs.map((item) => this.sanitize(item));
    this.responseWithResult(res, data);
  }

// Gets a list of object
  async index(req, res) {
    const query = req.body.query || {};
    this.onQuery(req, query);
    const data = await this.model.find(query).exec();
    this.responseWithResult(res, data.map((item) => this.sanitize(item)));
  }

// Gets a single object from the DB
  async show(req, res) {
    const data = await this.model.findById(req.params.id);
    this.handleEntityNotFound(res, data);
    this.responseWithResult(res, this.sanitize(data));
  }

// Creates a new object in the DB
  async create(req, res) {
    if (req.body._id) {
      delete req.body._id;
    }
    this.onCreate(req, req.body);
    const data = await this.model.create(req.body);
    this.responseWithResult(res, this.sanitize(data), 201);
  }

// Updates an existing object in the DB
  async update(req, res) {
    if (req.body._id) {
      delete req.body._id;
    }
    const query = {
      _id: req.params.id
    };
    this.onQuery(req, query);
    const data = await this.model.findOne(query);
    this.handleEntityNotFound(res, data);
    data.merge(req.body);
    await data.save();
    this.responseWithResult(res, this.sanitize(data));
  }

// Deletes a object from the DB
  async destroy(req, res) {
    const query = {
      _id: req.params.id
    };
    this.onQuery(req, query);
    const data = await this.model.remove(query);
    this.handleEntityNotFound(res, data);
    res.status(204).end();
  }

  onQuery(req, query) {
  }

  onCreate(req, query) {
  }

  sanitize(data) {
    if (typeof data.sanitize === 'function') {
      return data.sanitize();
    }
    return data.toObject({flattenDecimals: false});
  }
}
