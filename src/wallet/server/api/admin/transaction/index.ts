import { AdminTransactionController } from './controller';

export = route;

function route(router, auth) {
  let controller = new AdminTransactionController();
  router.get('/', auth.hasRole('admin'), controller.route(controller.indexPage));
  router.get('/:id', auth.hasRole('admin'), controller.route(controller.show));
  // router.post('/', auth.hasRole('admin'), controller.route(controller.create));
  // router.put('/:id', auth.hasRole('admin'), controller.route(controller.update));
  // router.patch('/:id', auth.hasRole('admin'), controller.route(controller.update));
  // router.delete('/:id', auth.hasRole('admin'), controller.route(controller.destroy));
}
