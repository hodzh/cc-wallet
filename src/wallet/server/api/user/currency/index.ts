import { CurrencyController } from './controller';

export = routeFactory;

function routeFactory(config) {
  var controller = new CurrencyController(config);
  return route;

  function route(router, auth) {
    router.get('/', auth.hasRole('user'), controller.route(controller.index));
  }
}
