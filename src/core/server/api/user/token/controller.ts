var Promise = require('bluebird');
var log = require('log4js').getLogger('token');
var controller = require('../../../web/controller');
export = controllerFactory;

function controllerFactory(token) {
  return {
    token: tokenVerify
  };

  function tokenVerify(req, res) {
    return Promise.resolve()
      .then(function () {
        // todo check token format
        return token.verify(req.params.token);
      })
      .then(redirect())
      .catch(controller.handleError(res));

    function redirect() {
      res.redirect('/');
    }
  }
}
