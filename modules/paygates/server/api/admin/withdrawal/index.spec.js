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

var routeFactory = proxyquire('./index', {
  './controller': withdrawalCtrlStub
});

var route = routeFactory();
route(routerStub, authServiceStub);

describe('Withdrawal Admin API Router:', function() {

  describe('GET /aapi/paygates/withdrawal', function() {

    it('should route to withdrawal.controller.index', function() {
      routerStub.get
        .withArgs('/', 'authService.hasRole.admin', 'withdrawalCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /aapi/paygates/withdrawal/:id', function() {

    it('should route to withdrawal.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'authService.hasRole.admin', 'withdrawalCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /aapi/paygates/withdrawal', function() {

    it('should route to withdrawal.controller.create', function() {
      routerStub.post
        .withArgs('/', 'authService.hasRole.admin', 'withdrawalCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /aapi/paygates/withdrawal/:id', function() {

    it('should route to withdrawal.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'authService.hasRole.admin', 'withdrawalCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /aapi/paygates/withdrawal/:id', function() {

    it('should route to withdrawal.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'authService.hasRole.admin', 'withdrawalCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /aapi/paygates/withdrawal/:id', function() {

    it('should route to withdrawal.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'authService.hasRole.admin', 'withdrawalCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
