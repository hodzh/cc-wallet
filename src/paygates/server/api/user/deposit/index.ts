import { DepositController } from './controller';

export = routeFactory;

function routeFactory() {

  var controller = new DepositController();
  return route;

  function route(router, auth) {
    router.get('/', auth.hasRole('user'), controller.route(controller.indexPage));
    router.get('/:id', auth.hasRole('user'), controller.route(controller.show));
  }
}
