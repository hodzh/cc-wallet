'use strict';

export = routeFactory;

function routeFactory(game) {
  var controllerFactory = require('./controller');
  var controller = controllerFactory(game);
  return route;

  function route(router, auth) {
    router.get('/', auth.hasRole('user'), controller.index);
    router.get('/:id', auth.hasRole('user'), controller.show);
  }
}
