import { TokenController } from './controller';

export = routeFactory;

function routeFactory(token) {

  var controller = new TokenController(token);
  return route;

  function route(router, auth) {
    router.get('/:token', /*auth.isAuthenticated(),*/ controller.route(controller.tokenVerify));
  }
}
