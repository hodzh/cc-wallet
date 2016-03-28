'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var authServiceStub = require('../../../auth/index.mock');

var userCtrlStub = {
  index: 'userCtrl.index',
  destroy: 'userCtrl.destroy',
  show: 'userCtrl.show',
  update: 'userCtrl.update',
  create: 'userCtrl.create'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

var index = proxyquire('./index', {
  './controller': userCtrlStub
});

index(routerStub, authServiceStub);

describe('Admin User API Router:', function() {

  describe('GET /aapi/user', function() {

    it('should verify admin role and route to user.controller.index', function() {
      routerStub.get
        .withArgs('/', 'authService.hasRole.admin', 'userCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /aapi/user/:id', function() {

    it('should verify admin role and route to user.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'authService.hasRole.admin', 'userCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /aapi/user/:id', function() {

    it('should be authenticated and route to user.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'authService.hasRole.admin', 'userCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /aapi/user/:id', function() {

    it('should be authenticated and route to user.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'authService.hasRole.admin', 'userCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /aapi/user', function() {

    it('should route to user.controller.create', function() {
      routerStub.post
        .withArgs('/', 'authService.hasRole.admin', 'userCtrl.create')
        .should.have.been.calledOnce;
    });

  });

});
