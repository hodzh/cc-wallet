import { CurrencyController } from './controller';

export = routeFactory;

function routeFactory() {
  let controller = new CurrencyController();
  return route;

  function route(router, auth) {
    router.get('/', auth.hasRole('user'), controller.route(controller.index));
  }
}
