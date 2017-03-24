import controllerFactory = require('./controller');

export = routeFactory;

function routeFactory(token, mailer, auth) {

  let controller = controllerFactory(token, mailer, auth);
  return route;

  function route(router) {
    router.get('/', auth.isAuthenticated(), controller.me);
    router.put('/password', auth.hasRole('user'), controller.changePassword);
    router.put('/reset-password', controller.resetPassword);
    router.put('/set-password', controller.setPassword);
    router.put('/email-verify', auth.hasRole('applicant'), controller.emailVerify);
    router.post('/', controller.create);
  }
}
