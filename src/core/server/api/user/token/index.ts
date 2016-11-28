export = routeFactory;

function routeFactory(token) {

  var controllerFactory = require('./controller');
  var controller = controllerFactory(token);
  return route;

  function route(router, auth) {
    router.get('/:token', /*auth.isAuthenticated(),*/ controller.token);
  }
}
