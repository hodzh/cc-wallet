'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var authServiceStub = require('../../../../../../server/auth/index.mock');

var depositCtrlStub = function() {
  return {
    index: 'depositCtrl.index',
    show: 'depositCtrl.show',
    create: 'depositCtrl.create',
    update: 'depositCtrl.update',
    destroy: 'depositCtrl.destroy'
  }
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

var routeFactory = proxyquire('./index', {
  './controller': depositCtrlStub
});

var route = routeFactory();
route(routerStub, authServiceStub);

describe('Deposit API Router:', function() {

  describe('GET /api/paygates/deposit', function() {

    it('should route to depositCtrl.index', function() {
      routerStub.get
        .withArgs('/', 'authService.isAuthenticated', 'depositCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/paygates/deposit/:id', function() {

    it('should route to depositCtrl.show', function() {
      routerStub.get
        .withArgs('/:id', 'authService.isAuthenticated', 'depositCtrl.show')
        .should.have.been.calledOnce;
    });

  });

});
