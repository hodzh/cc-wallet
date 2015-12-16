'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var authServiceStub = require('../../auth/index.mock');

var userCtrlStub = {
  index: 'userCtrl.index',
  destroy: 'userCtrl.destroy',
  me: 'userCtrl.me',
  changePassword: 'userCtrl.changePassword',
  show: 'userCtrl.show',
  create: 'userCtrl.create'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

var index = proxyquire('./index', {
  './user.controller': userCtrlStub
});

describe('User API Router:', function() {

  it('should return an express router instance', function() {
    index.should.be.instanceof(Function);
    index(routerStub, authServiceStub).should.equal(routerStub);
  });

  describe('GET /api/users', function() {

    it('should verify admin role and route to user.controller.index', function() {
      routerStub.get
        .withArgs('/', 'authService.hasRole.admin', 'userCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/users/:id', function() {

    it('should verify admin role and route to user.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'authService.hasRole.admin', 'userCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/users/me', function() {

    it('should be authenticated and route to user.controller.me', function() {
      routerStub.get
        .withArgs('/me', 'authService.isAuthenticated', 'userCtrl.me')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/users/:id/password', function() {

    it('should be authenticated and route to user.controller.changePassword', function() {
      routerStub.put
        .withArgs('/:id/password', 'authService.isAuthenticated', 'userCtrl.changePassword')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/users/:id', function() {

    it('should be authenticated and route to user.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'authService.isAuthenticated', 'userCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/users', function() {

    it('should route to user.controller.create', function() {
      routerStub.post
        .withArgs('/', 'userCtrl.create')
        .should.have.been.calledOnce;
    });

  });

});
