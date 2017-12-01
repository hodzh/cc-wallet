import { WithdrawalController } from './controller';

export = routeFactory;

function routeFactory() {
  var controller = new WithdrawalController();
  return route;

  function route(router, auth) {
    router.get('/', auth.hasRole('user'), controller.route(controller.indexPage));
    router.get('/:id', auth.hasRole('user'), controller.route(controller.show));
  }
}
