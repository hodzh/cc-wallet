'use strict';

var controller = require('./controller');

export = routeFactory;

function routeFactory(config) {
  return route;

  function route(router, auth) {
    router.get('/', auth.hasRole('user'), controller.index);
    router.get('/:id', auth.hasRole('user'), controller.show);
    router.post('/', auth.hasRole('user'), controller.create);
  }
}
