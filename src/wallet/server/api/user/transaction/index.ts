var controller = require('./controller');

export = routeFactory;

function routeFactory(config) {
  return route;

  function route(router, auth) {
    router.get('/', auth.hasRole('user'), controller.indexPage);
    router.get('/:id', auth.hasRole('user'), controller.show);
  }
}
