'use strict';

export = route;

function route(router, auth, controller) {
  router.get('/', auth.hasRole('admin'), controller.index);
  router.get('/:id', auth.hasRole('admin'), controller.show);
  router.put('/:id', auth.hasRole('admin'), controller.update);
  router.post('/', auth.hasRole('admin'), controller.create);
  router.delete('/:id', auth.hasRole('admin'), controller.destroy);
}
