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
  updated: new Date(),
  created: new Date(),
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
    return User.remove();
  });

  before(function() {
    return Account.remove();
  });

  before(function() {
    return Transaction.remove();
  });

  before(function() {
    user = new User({
      provider: 'local',
      email: 'admin@admin.admin',
      password: 'admin',
      role: 'admin'
    });
    return user.save();
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
    return User.remove();
  });

  after(function() {
    return Account.remove();
  });

  after(function() {
    return Transaction.remove();
  });

  describe('GET /aapi/account', function() {
    var accounts;

    beforeEach(function(done) {
      request(app)
        .get('/aapi/account')
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

  describe('POST /aapi/account', function() {

    beforeEach(function(done) {
      request(app)
        .post('/aapi/account')
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

  describe('GET /aapi/account/:id', function() {
    var account;

    beforeEach(function(done) {
      request(app)
        .get('/aapi/account/' + newAccount._id)
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

  describe('PUT /aapi/account/:id', function() {
    var updatedAccount;

    beforeEach(function(done) {
      request(app)
        .put('/aapi/account/' + newAccount._id)
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

  describe('DELETE /aapi/account/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/aapi/account/' + newAccount._id)
        .set('authorization', 'Bearer ' + token)
        .expect(204)
        .end(function(err, res) {
          done(err);
        });
    });

    it('should respond with 404 when account does not exist', function(done) {
      request(app)
        .delete('/aapi/account/' + newAccount._id)
        .set('authorization', 'Bearer ' + token)
        .expect(404)
        .end(function(err, res) {
          done(err);
        });
    });

  });

});
