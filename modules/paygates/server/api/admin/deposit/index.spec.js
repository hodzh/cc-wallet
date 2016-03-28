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
  };
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

describe('Deposit Admin API Router:', function() {

  describe('GET /aapi/paygates/deposit', function() {

    it('should route to deposit.controller.index', function() {
      routerStub.get
        .withArgs('/', 'authService.hasRole.admin', 'depositCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /aapi/paygates/deposit/:id', function() {

    it('should route to deposit.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'authService.hasRole.admin', 'depositCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /aapi/paygates/deposit', function() {

    it('should route to deposit.controller.create', function() {
      routerStub.post
        .withArgs('/', 'authService.hasRole.admin', 'depositCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /aapi/paygates/deposit/:id', function() {

    it('should route to deposit.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'authService.hasRole.admin', 'depositCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /aapi/paygates/deposit/:id', function() {

    it('should route to deposit.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'authService.hasRole.admin', 'depositCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /aapi/paygates/deposit/:id', function() {

    it('should route to deposit.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'authService.hasRole.admin', 'depositCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
