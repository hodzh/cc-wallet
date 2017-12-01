import { AdminAccountController } from './controller';

export = route;

function route(router, auth) {
  let controller = new AdminAccountController();
  router.get('/', auth.hasRole('admin'), controller.route(controller.indexPage));
  router.get('/:id', auth.hasRole('admin'), controller.route(controller.show));
  router.post('/', auth.hasRole('admin'), controller.route(controller.create));
  router.put('/:id', auth.hasRole('admin'), controller.route(controller.update));
  router.put('/:id/income', auth.hasRole('admin'), controller.route(controller.income));
  router.put('/:id/outcome', auth.hasRole('admin'), controller.route(controller.outcome));
  router.patch('/:id', auth.hasRole('admin'), controller.route(controller.update));
  router.delete('/:id', auth.hasRole('admin'), controller.route(controller.destroy));
}
