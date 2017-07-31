var Account = require('../../../model/account');
var controller = require('../../../../../core/server/web/controller');

function responseWithUserResult(res, statusCode = 200) {
  return function (entity) {
    if (entity) {
      res.status(statusCode).json(entity.sanitize());
    }
  };
}let tokenSchema = {
  type: 'string',
  format: /^[a-zA-Z0-9\-_]+?\.[a-zA-Z0-9\-_]+?\.([a-zA-Z0-9\-_]+)?$/,
};

export = {
  index,
  show,
  create
};

// Gets a list of Accounts
function index(req, res) {
  Account.getAccounts('user', req.user._id)
    .then((accounts) => accounts.map(account => account.sanitize()))
    .then(controller.responseWithResult(res, 200))
    .catch(controller.handleError(res));
}

// Gets a single Account from the DB
function show(req, res) {
  Account.findById(req.params.id)
    .then(controller.checkOwner(req))
    .then((entity) => {
      if (!entity) {
        return null;
      }
      if (entity.type != 'user') {
        return null;
      }
      return entity;
    })
    .then(controller.handleEntityNotFound(res))
    .then(responseWithUserResult(res))
    .catch(controller.handleError(res));
}

function create(req, res) {
  Account.enable({
    owner: req.user._id,
    currency: req.body.currency,
    type: 'user'
  }, true)
    .then(controller.handleEntityNotFound(res))
    .then(responseWithUserResult(res))
    .then(controller.handleEntityNotFound(res))
    .catch(controller.handleError(res));
}
