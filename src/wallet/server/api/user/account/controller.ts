var Account = require('../../../model/account');

function handleError(res, statusCode = 500) {
  return function (err) {
    res.status(statusCode).send(err);
  };
}

function responseWithResult(res, statusCode = 200) {
  return function (entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function responseWithUserResult(res, statusCode = 200) {
  return function (entity) {
    if (entity) {
      res.status(statusCode).json(entity.sanitize());
    }
  };
}

function handleEntityNotFound(res) {
  return function (entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

export = {
  index,
  show,
  create
};

// Gets a list of Accounts
function index(req, res) {
  Account.getAccounts('user', req.user._id)
    .then(function (accounts) {
      return accounts.map(function (account) {
        return account.getUserData();
      });
    })
    .then(responseWithResult(res))
    .catch(handleError(res));
}

// Gets a single Account from the DB
function show(req, res) {
  Account.findById(req.params.id)
    .then(handleEntityNotFound(res))
    .then(function (entity) {
      if (entity) {
        return entity.getUserData();
      }
    })
    .then(responseWithUserResult(res))
    .catch(handleError(res));
}

function create(req, res) {
  Account.enable({
    owner: req.user._id,
    currency: req.body.currency,
    type: 'user'
  }, true)
    .then(handleEntityNotFound(res))
    .then(responseWithUserResult(res))
    .catch(handleError(res));
}
