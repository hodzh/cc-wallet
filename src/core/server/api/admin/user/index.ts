import { AdminUserConfigController } from './controller';

export = route;

function route(router, auth) {
  let controller = new AdminUserConfigController();
  router.get('/', auth.hasRole('admin'), controller.route(controller.indexPage));
  router.get('/:id', auth.hasRole('admin'), controller.route(controller.show));
  router.put('/:id', auth.hasRole('admin'), controller.route(controller.update));
  router.post('/', auth.hasRole('admin'), controller.route(controller.create));
  router.delete('/:id', auth.hasRole('admin'), controller.route(controller.destroy));
}
