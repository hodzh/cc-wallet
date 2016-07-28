'use strict';

module.exports = routeFactory;

function routeFactory(config) {
  var controller = require('./controller')(config);
  return route;

  function route(router, auth) {
    router.get('/', auth.hasRole('user'), controller.index);
  }
}
