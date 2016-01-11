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

describe('Transaction API Router:', function() {

  describe('GET /api/transaction', function() {

    it('should route to transaction.controller.index', function() {
      routerStub.get
        .withArgs('/', 'authService.isAuthenticated', 'transactionCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/transaction/:id', function() {

    it('should route to transaction.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'authService.isAuthenticated', 'transactionCtrl.show')
        .should.have.been.calledOnce;
    });

  });

});
