'use strict';

export = routeFactory;

function routeFactory() {

  var controller = require('./controller');
  return route;

  function route(router, auth) {
    router.get('/', auth.hasRole('user'), controller.indexPage);
    router.get('/:id', auth.hasRole('user'), controller.show);
  }
}
