'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var authServiceStub = require('../../../../../../server/auth/index.mock');

var transactionCtrlStub = {
  index: 'transactionCtrl.index',
  show: 'transactionCtrl.show',
  create: 'transactionCtrl.create',
  update: 'transactionCtrl.update',
  destroy: 'transactionCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

var index = proxyquire('./index', {
  './controller': transactionCtrlStub
});

index(routerStub, authServiceStub);

describe('Transaction Admin API Router:', function() {

  describe('GET /admin/transaction', function() {

    it('should route to transaction.controller.index', function() {
      routerStub.get
        .withArgs('/', 'authService.hasRole.admin', 'transactionCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /admin/transaction/:id', function() {

    it('should route to transaction.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'authService.hasRole.admin', 'transactionCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /admin/transaction', function() {

    it('should route to transaction.controller.create', function() {
      routerStub.post
        .withArgs('/', 'authService.hasRole.admin', 'transactionCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /admin/transaction/:id', function() {

    it('should route to transaction.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'authService.hasRole.admin', 'transactionCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /admin/transaction/:id', function() {

    it('should route to transaction.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'authService.hasRole.admin', 'transactionCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /admin/transaction/:id', function() {

    it('should route to transaction.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'authService.hasRole.admin', 'transactionCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
