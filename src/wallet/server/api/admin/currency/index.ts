import { AdminCurrencyController } from './controller';

export = route;

function route(router, auth) {
  let controller = new AdminCurrencyController();
  router.get('/', auth.hasRole('admin'), controller.route(controller.index));
  router.get('/:id', auth.hasRole('admin'), controller.route(controller.show));
  router.post('/', auth.hasRole('admin'), controller.route(controller.create));
  router.put('/:id', auth.hasRole('admin'), controller.route(controller.update));
  router.patch('/:id', auth.hasRole('admin'), controller.route(controller.update));
  // router.delete('/:id', auth.hasRole('admin'), controller.route(controller.destroy));
}
