'use strict';

var controller = require('./controller');

module.exports = route;

function route(router, auth) {
    router.get('/', auth.isAuthenticated(), controller.index);
    router.get('/:id', auth.isAuthenticated(), controller.show);
}
