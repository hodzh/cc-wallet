'use strict';

var controller = require('./controller');

module.exports = routeFactory;

function routeFactory(config) {
  return route;

  function route(router, auth) {
    router.get('/', auth.hasRole('user'), controller.index);
    router.get('/:id', auth.hasRole('user'), controller.show);
  }
}