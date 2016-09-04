'use strict';

export = routeFactory;

function routeFactory(token, mailer) {

  var controllerFactory = require('./controller');
  var controller = controllerFactory(token, mailer);
  return route;

  function route(router, auth) {
    router.get('/', auth.isAuthenticated(), controller.me);
    router.put('/password', auth.hasRole('user'), controller.changePassword);
    router.post('/', controller.create(auth));

  }
}
