export = route;

function route(router, auth, controller) {
  router.get('/', auth.hasRole('admin'), controller.route(controller.index));
  router.get('/:id', auth.hasRole('admin'), controller.route(controller.show));
  router.put('/:id', auth.hasRole('admin'), controller.route(controller.update));
  router.post('/', auth.hasRole('admin'), controller.route(controller.create));
  router.delete('/:id', auth.hasRole('admin'), controller.route(controller.destroy));
}
