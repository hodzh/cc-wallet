'use strict';

var controller = require('./controller');

module.exports = routeFactory;

function routeFactory(config) {
  return route;

  function route(router, auth) {
    router.get('/', auth.hasRole('user'), controller.index(config.currency));
    router.get('/:id', auth.hasRole('user'), controller.show);
    router.put('/:id/enable', auth.hasRole('user'), controller.enable);
    router.put('/:id/disable', auth.hasRole('user'), controller.disable);
  }
}