'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var authServiceStub = require('../../../../../../server/auth/index.mock');

var withdrawalCtrlStub = function() {
  return {
    index: 'withdrawalCtrl.index',
    show: 'withdrawalCtrl.show',
    create: 'withdrawalCtrl.create',
    update: 'withdrawalCtrl.update',
    destroy: 'withdrawalCtrl.destroy'
  };
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

var game = {};

var routeFactory = proxyquire('./index', {
  './controller': withdrawalCtrlStub
});

var route = routeFactory(game);
route(routerStub, authServiceStub);

describe('Withdrawal API Router:', function() {

  describe('GET /api/vp/withdrawal', function() {

    it('should route to withdrawalCtrl.index', function() {
      routerStub.get
        .withArgs('/', 'authService.isAuthenticated', 'withdrawalCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/vp/withdrawal/:id', function() {

    it('should route to withdrawalCtrl.show', function() {
      routerStub.get
        .withArgs('/:id', 'authService.isAuthenticated', 'withdrawalCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/vp/withdrawal', function() {

    it('should route to withdrawalCtrl.create', function() {
      routerStub.post
        .withArgs('/', 'authService.isAuthenticated', 'withdrawalCtrl.create')
        .should.have.been.calledOnce;
    });

  });

});
