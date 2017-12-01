import { DevDbController } from './controller';

export = function (config) {

  return route;

  function route(router, auth) {
    var controller = new DevDbController(config);
    router.get('/clear-all', controller.route(controller.clearAll));
    router.get('/add-users', controller.route(controller.addUsers));
  }
}
