'use strict';

var request = require('supertest');

var app = require('../../../../../../server').web.express;
var User = require('../../../../../../server/model/user');
var Account = require('../../../model/account');
var Transaction = require('../../../model/transaction');

var newAccount;
var accountToCreate = {
  type: 'user',
  currency: 'bitcoin',
  balance: '0',
  enable: true,
  updateDate: new Date(),
  createDate: new Date(),
  pendingTransactions: [],
  address: 'address'
};
var accountToUpdate = {
  type: 'type2'
};

describe('Account Admin API:', function() {

  var user;
  var token;

  before(function() {
    return User.removeAsync();
  });

  before(function() {
    return Account.removeAsync();
  });

  before(function() {
    return Transaction.removeAsync();
  });

  before(function() {
    user = new User({
      provider: 'local',
      email: 'admin@admin.admin',
      password: 'admin',
      role: 'admin'
    });
    return user.saveAsync();
  });

  before(function(done) {
    accountToCreate.owner = user._id;
    request(app)
      .post('/auth/local')
      .send({
        email: 'admin@admin.admin',
        password: 'admin'
      })
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        expect(res).to.have.property('body');
        expect(res.body).to.have.property('token');
        token = res.body.token;
        expect(token).to.have.length.above(0);
        done();
      });
  });

  after(function() {
    return User.removeAsync();
  });

  after(function() {
    return Account.removeAsync();
  });

  after(function() {
    return Transaction.removeAsync();
  });

  describe('GET /admin/account', function() {
    var accounts;

    beforeEach(function(done) {
      request(app)
        .get('/admin/account')
        .set('authorization', 'Bearer ' + token)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          accounts = res.body;
          done(err);
        });
    });

    it('should respond with JSON array', function() {
      accounts.should.be.instanceOf(Array);
      accounts.length.should.equal(0);
    });

  });

  describe('POST /admin/account', function() {

    beforeEach(function(done) {
      request(app)
        .post('/admin/account')
        .set('authorization', 'Bearer ' + token)
        .send(accountToCreate)
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          newAccount = res.body;
          done(err);
        });
    });

    it('should respond with the newly created account', function() {
      newAccount.address.should.equal(accountToCreate.address);
      newAccount.balance.should.equal(accountToCreate.balance);
      newAccount.currency.should.equal(accountToCreate.currency);
      newAccount.type.should.equal(accountToCreate.type);
      newAccount.pendingTransactions.should.be.instanceOf(Array);
      newAccount.pendingTransactions.length.should.equal(0);
      newAccount.enable.should.equal(true);
      //newAccount.owner.should.equal(user._id.toString());
    });

  });

  describe('GET /admin/account/:id', function() {
    var account;

    beforeEach(function(done) {
      request(app)
        .get('/admin/account/' + newAccount._id)
        .set('authorization', 'Bearer ' + token)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          account = res.body;
          done(err);
        });
    });

    afterEach(function() {
      account = {};
    });

    it('should respond with the requested account', function() {
      newAccount._id.should.equal(account._id);
      newAccount.address.should.equal(account.address);
      newAccount.balance.should.equal(account.balance);
      newAccount.currency.should.equal(account.currency);
      newAccount.type.should.equal(account.type);
      account.pendingTransactions.should.be.instanceOf(Array);
      account.pendingTransactions.length.should.equal(0);
      newAccount.enable.should.equal(account.enable);
      //newAccount.owner.should.equal(account.owner._id);
    });

  });

  describe('PUT /admin/account/:id', function() {
    var updatedAccount;

    beforeEach(function(done) {
      request(app)
        .put('/admin/account/' + newAccount._id)
        .set('authorization', 'Bearer ' + token)
        .send(accountToUpdate)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          updatedAccount = res.body;
          done(err);
        });
    });

    afterEach(function() {
      updatedAccount = {};
    });

    it('should respond with the updated account', function() {
      updatedAccount.type.should.equal(accountToUpdate.type);
    });

  });

  describe('DELETE /admin/account/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/admin/account/' + newAccount._id)
        .set('authorization', 'Bearer ' + token)
        .expect(204)
        .end(function(err, res) {
          done(err);
        });
    });

    it('should respond with 404 when account does not exist', function(done) {
      request(app)
        .delete('/admin/account/' + newAccount._id)
        .set('authorization', 'Bearer ' + token)
        .expect(404)
        .end(function(err, res) {
          done(err);
        });
    });

  });

});
