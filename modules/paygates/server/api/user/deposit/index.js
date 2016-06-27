'use strict';

module.exports = routeFactory;

function routeFactory() {

  var controllerFactory = require('./controller');
  var controller = controllerFactory();
  return route;

  function route(router, auth) {
    router.get('/', auth.hasRole('user'), controller.index);
    router.get('/:id', auth.hasRole('user'), controller.show);
  }
}