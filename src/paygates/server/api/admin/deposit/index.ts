import { AdminDepositController } from './controller';

export = routeFactory;

function routeFactory() {

  var controller = new AdminDepositController();
  return route;

  function route(router, auth) {
    router.get('/', auth.hasRole('admin'), controller.route(controller.indexPage));
    router.get('/:id', auth.hasRole('admin'), controller.route(controller.show));
    router.post('/', auth.hasRole('admin'), controller.route(controller.create));
    router.put('/:id', auth.hasRole('admin'), controller.route(controller.update));
    router.patch('/:id', auth.hasRole('admin'), controller.route(controller.update));
    router.delete('/:id', auth.hasRole('admin'), controller.route(controller.destroy));
  }
}
