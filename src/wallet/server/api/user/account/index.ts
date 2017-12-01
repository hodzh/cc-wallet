import { AccountController } from './controller';

export = routeFactory;

function routeFactory(config) {
  let controller = new AccountController();
  return route;

  function route(router, auth) {
    router.get('/', auth.hasRole('user'), controller.route(controller.index));
    router.get('/:id', auth.hasRole('user'), controller.route(controller.show));
    router.post('/', auth.hasRole('user'), controller.route(controller.create));
  }
}
