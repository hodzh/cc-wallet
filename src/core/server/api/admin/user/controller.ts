import User = require('../../../model/user');

function validationError(res, statusCode = 422) {
  return function (err) {
    res.status(statusCode).json(err);
  };
}

function handleError(res, statusCode = 500) {
  return function (err) {
    res.status(statusCode).send(err);
  };
}

export = {
  indexPage: index,
  show: show,
  update: update,
  destroy: destroy,
  create: create
};

/**
 * Get list of users
 * restriction: 'admin'
 */
function index(req, res) {
  Promise.resolve()
    .then(function () {
      return User.query({}, {
        page: req.query.page,
        limit: req.query.limit
      });
    })
    .then(function (result) {
      res.status(200)
        .json(result);
    })
    .catch(handleError(res));
}

/**
 * Get a single user
 */
function show(req, res) {
  var userId = req.params.id;
  Promise.resolve()
    .then(function () {
      return User.findById(userId);
    })
    .then(function (user) {
      if (!user) {
        return res.status(404).end();
      }
      res.json(user.sanitize());
    })
    .catch(handleError(res));
}

/**
 * Update a single user
 */
function update(req, res) {
  var userId = req.params.id;
  Promise.resolve()
    .then(function () {
      return User.findById(userId);
    })
    .then(function (user) {
      if (!user) {
        return res.status(404).end();
      }
      if (req.body.name) {
        user.name = req.body.name;
      }
      if (req.body.email) {
        user.email = req.body.email;
      }
      if (req.body.password) {
        user.password = req.body.password;
      }
      if (req.body.role) {
        user.role = req.body.role;
      }
      return user.save();
    })
    .then(function (user) {
      res.json(user.profile);
    })
    .catch(handleError(res));
}

/**
 * Deletes a user
 */
function destroy(req, res) {
  Promise.resolve()
    .then(function () {
      return User.findByIdAndRemove(req.params.id);
    })
    .then(function () {
      res.status(204).end();
    })
    .catch(handleError(res));
}

/**
 * Creates a new user
 */
function create(req, res) {
  var newUser = new User(req.body);
  newUser.provider = 'local';
  newUser.role = 'user';
  newUser.save()
    .then(user => {
      res.json(user);
    })
    .catch(validationError(res));
}
