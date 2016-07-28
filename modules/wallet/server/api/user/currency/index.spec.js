'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var authServiceStub = require('../../../../../../server/auth/index.mock');

var accountCtrlStub = {
  index: function(currency) {
    return 'accountCtrl.index.'+currency;
  },
  show: 'accountCtrl.show',
  create: 'accountCtrl.create',
  update: 'accountCtrl.update',
  destroy: 'accountCtrl.destroy'
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

var config = {
  currency: 'currency'
};

index(config)(routerStub, authServiceStub);

describe('Account API Router:', function() {

  describe('GET /api/account', function() {

    it('should route to accountCtrl.index', function() {
      routerStub.get
        .withArgs('/', 'authService.isAuthenticated', 'accountCtrl.index.currency')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/account/:id', function() {

    it('should route to accountCtrl.show', function() {
      routerStub.get
        .withArgs('/:id', 'authService.isAuthenticated', 'accountCtrl.show')
        .should.have.been.calledOnce;
    });

  });

});
