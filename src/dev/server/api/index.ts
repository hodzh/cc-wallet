export = function (config) {

  return route;

  function route(router, auth) {
    var ControllerFactory = require('./controller');
    var controller = new ControllerFactory(config);
    router.get('/clear-all', controller.clearAll.bind(controller));
    router.get('/add-users', controller.addUsers.bind(controller));
  }
}
