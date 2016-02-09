'use strict';

var controller = require('./controller');

module.exports = routeFactory;

function routeFactory(config) {
  return route;

  function route(router, auth) {
    router.get('/', auth.isAuthenticated(), controller.index);
    router.get('/:id', auth.isAuthenticated(), controller.show);
  }
}