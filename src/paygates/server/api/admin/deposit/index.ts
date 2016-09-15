export = routeFactory;

function routeFactory() {

  var controller = require('./controller');
  return route;

  function route(router, auth) {
    router.get('/', auth.hasRole('admin'), controller.indexPage);
    router.get('/:id', auth.hasRole('admin'), controller.show);
    router.post('/', auth.hasRole('admin'), controller.create);
    router.put('/:id', auth.hasRole('admin'), controller.update);
    router.patch('/:id', auth.hasRole('admin'), controller.update);
    router.delete('/:id', auth.hasRole('admin'), controller.destroy);
  }
}
