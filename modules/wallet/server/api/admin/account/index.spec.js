'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var authServiceStub = require('../../../../../../server/auth/index.mock');

var accountCtrlStub = {
  index: 'accountCtrl.index',
  show: 'accountCtrl.show',
  create: 'accountCtrl.create',
  update: 'accountCtrl.update',
  destroy: 'accountCtrl.destroy',
  income: 'accountCtrl.income',
  outcome: 'accountCtrl.outcome'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

var index = proxyquire('./index', {
  './controller': accountCtrlStub
});

index(routerStub, authServiceStub);

describe('Account Admin API Router:', function() {

  describe('GET /aapi/account', function() {

    it('should route to account.controller.index', function() {
      routerStub.get
        .withArgs('/', 'authService.hasRole.admin', 'accountCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /aapi/account/:id', function() {

    it('should route to account.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'authService.hasRole.admin', 'accountCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /aapi/account', function() {

    it('should route to account.controller.create', function() {
      routerStub.post
        .withArgs('/', 'authService.hasRole.admin', 'accountCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /aapi/account/:id', function() {

    it('should route to account.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'authService.hasRole.admin', 'accountCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /aapi/account/:id/income', function() {

    it('should route to account.controller.income', function() {
      routerStub.put
        .withArgs('/:id/income', 'authService.hasRole.admin', 'accountCtrl.income')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /aapi/account/:id/outcome', function() {

    it('should route to account.controller.outcome', function() {
      routerStub.put
        .withArgs('/:id/outcome', 'authService.hasRole.admin', 'accountCtrl.outcome')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /aapi/account/:id', function() {

    it('should route to account.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'authService.hasRole.admin', 'accountCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /aapi/account/:id', function() {

    it('should route to account.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'authService.hasRole.admin', 'accountCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
