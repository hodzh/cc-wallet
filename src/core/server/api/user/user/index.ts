import controllerFactory = require('./controller');

export = routeFactory;

function routeFactory(token, mailer) {

  var controller = controllerFactory(token, mailer);
  return route;

  function route(router, auth) {
    router.get('/', auth.isAuthenticated(), controller.me);
    router.put('/password', auth.hasRole('user'), controller.changePassword);
    router.put('/reset-password', auth.hasRole('user'), controller.resetPassword);
    router.put('/email-verify', auth.hasRole('applicant'), controller.emailVerify(auth));
    router.post('/', controller.create(auth));
  }
}
