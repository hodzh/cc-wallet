'use strict';

var controller = require('./user.controller');

module.exports = route;

function route(router, auth) {
    router.get('/', auth.hasRole('admin'), controller.index);
    router.delete('/:id', auth.hasRole('admin'), controller.destroy);
    router.get('/me', auth.isAuthenticated(), controller.me);
    router.put('/:id/password', auth.isAuthenticated(), controller.changePassword);
    router.get('/:id', auth.isAuthenticated(), controller.show);
    router.post('/', controller.create);
    return router;
}