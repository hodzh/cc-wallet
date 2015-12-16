'use strict';

var controller = require('./thing.controller');

module.exports = route;

function route(router, auth) {
    router.get('/', controller.index);
    router.get('/:id', controller.show);
    router.post('/', controller.create);
    router.put('/:id', controller.update);
    router.patch('/:id', controller.update);
    router.delete('/:id', controller.destroy);
    return router;
}
