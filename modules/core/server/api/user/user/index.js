'use strict';

module.exports = routeFactory;

function routeFactory() {

  var controllerFactory = require('./controller');
  var controller = controllerFactory();
  return route;

  function route(router, auth) {
    router.get('/', auth.isAuthenticated(), controller.me);
    router.put('/password', auth.isAuthenticated(), controller.changePassword);
    router.post('/', controller.create(auth));

  }
}
