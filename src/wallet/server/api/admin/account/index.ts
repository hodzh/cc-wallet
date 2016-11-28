var controller = require('./controller');

export = route;

function route(router, auth) {
  router.get('/', auth.hasRole('admin'), controller.indexPage);
  router.get('/:id', auth.hasRole('admin'), controller.show);
  router.post('/', auth.hasRole('admin'), controller.create);
  router.put('/:id', auth.hasRole('admin'), controller.update);
  router.put('/:id/income', auth.hasRole('admin'), controller.income);
  router.put('/:id/outcome', auth.hasRole('admin'), controller.outcome);
  router.patch('/:id', auth.hasRole('admin'), controller.update);
  router.delete('/:id', auth.hasRole('admin'), controller.destroy);
}
