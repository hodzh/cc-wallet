'use strict';

var controller = require('./controller');

module.exports = routeFactory;

function routeFactory(config) {
  return route;

  function route(router, auth) {
    router.get('/', auth.isAuthenticated(), controller.index(config.currency));
    router.get('/:id', auth.isAuthenticated(), controller.show);
    router.put('/:id/enable', auth.isAuthenticated(), controller.enable);
    router.put('/:id/disable', auth.isAuthenticated(), controller.disable);
  }
}