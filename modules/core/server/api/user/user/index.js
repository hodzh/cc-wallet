'use strict';

var controller = require('./controller');

module.exports = route;

function route(router, auth) {
  router.get('/', auth.isAuthenticated(), controller.me);
  router.put('/password', auth.isAuthenticated(), controller.changePassword);
  router.post('/', controller.create(auth));
}