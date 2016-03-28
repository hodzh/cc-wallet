'use strict';

module.exports = routeFactory;

function routeFactory(game) {
  var controllerFactory = require('./controller');
  var controller = controllerFactory(game);
  return route;

  function route(router, auth) {
    router.get('/', auth.isAuthenticated(), controller.index);
    router.get('/:id', auth.isAuthenticated(), controller.show);
    router.post('/', auth.isAuthenticated(), controller.create);
  }
}