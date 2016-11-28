var controller = require('./controller');

export = route;

function route(router, auth) {
  router.get('/', auth.hasRole('admin'), controller.indexPage);
  router.get('/:id', auth.hasRole('admin'), controller.show);
  router.put('/:id', auth.hasRole('admin'), controller.update);
  router.post('/', auth.hasRole('admin'), controller.create);
  router.delete('/:id', auth.hasRole('admin'), controller.destroy);
}
