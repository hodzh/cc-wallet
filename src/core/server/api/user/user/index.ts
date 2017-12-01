import { UserController } from './controller';

export = routeFactory;

function routeFactory(config, token, mailer, auth) {

  let controller = new UserController(token, mailer, auth);
  return route;

  function route(router) {
    router.get('/', auth.isAuthenticated(), controller.route(controller.me));
    router.put('/password', auth.hasRole('user'), controller.route(controller.changePassword));
    if (config.resetPassword) {
      router.put('/reset-password', controller.route(controller.resetPassword));
    }
    router.put('/set-password', controller.route(controller.setPassword));
    router.put('/email-verify', auth.hasRole('applicant'), controller.route(controller.emailVerify));
    if (config.signup) {
      router.post('/', controller.route(controller.create));
    }
  }
}
