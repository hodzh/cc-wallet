'use strict';

var request = require('supertest');

var app = require('../../../../../../server').web.express;
var User = require('../../../../../../server/model/user');
var Account = require('../../../model/account');
var Transaction = require('../../../model/transaction');

describe('Transaction Admin API:', function() {

  var admin;
  var user;
  var token;
  var adminAccount;
  var userAccount;
  var newTransaction;

  var transactionToCreate = {
    state: 'state',
    error: 'error',
    createDate: new Date(),
    updateDate: new Date(),
    category: 'category',
    currency: 'currency',
    amount: '1',
    purpose: 'purpose',
    status: 'status'
  };

  var transactionToUpdate = {
    state: 'state2',
    error: 'error2',
    createDate: new Date(),
    updateDate: new Date(),
    category: 'category2',
    currency: 'currency2',
    amount: '2',
    purpose: 'purpose2',
    status: 'status2'
  };

  before(function() {
    return User.removeAsync();
  });

  before(function() {
    return Account.removeAsync();
  });

  before(function() {
    return Transaction.removeAsync();
  });

  before(function(done) {
    admin = new User({
      provider: 'local',
      email: 'admin@admin.admin',
      password: 'admin',
      role: 'admin'
    });
    admin.save(auth);

    function auth(err, userModel) {
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
    }
  });

  before(function() {
    user = new User({
      provider: 'local',
      email: 'user@user.user',
      password: 'user',
      role: 'user'
    });
    return user.saveAsync();
  });

  before(function() {
    return Account.enable({
        currency: transactionToCreate.currency,
        type: 'user',
        owner: user._id
      })
      .then(
        function(account){
          userAccount = account;
        }
      );
  });

  before(function() {
    return Account.enable({
        currency: transactionToCreate.currency,
        type: 'admin',
        owner: admin._id
      })
      .then(
        function(account){
          adminAccount = account;
        }
      );
  });

  before(function() {
    transactionToCreate.from = adminAccount._id;
    transactionToCreate.to = userAccount._id;
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

  describe('GET /admin/transaction', function() {
    var transactions;

    beforeEach(function(done) {
      request(app)
        .get('/admin/transaction')
        .set('authorization', 'Bearer ' + token)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          transactions = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      transactions.should.be.instanceOf(Array);
    });

  });

  describe('POST /admin/transaction', function() {
    beforeEach(function(done) {
      request(app)
        .post('/admin/transaction')
        .set('authorization', 'Bearer ' + token)
        .send(transactionToCreate)
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          newTransaction = res.body;
          done();
        });
    });

    it('should respond with the newly created transaction', function() {
      transactionToCreate.state.should.equal(newTransaction.state);
      transactionToCreate.error.should.equal(newTransaction.error);
      //transactionToCreate.createDate.should.equal(newTransaction.createDate.toString());
      //transactionToCreate.updateDate.should.equal(newTransaction.updateDate.toString());
      transactionToCreate.category.should.equal(newTransaction.category);
      transactionToCreate.currency.should.equal(newTransaction.currency);
      transactionToCreate.amount.should.equal(newTransaction.amount);
      transactionToCreate.purpose.should.equal(newTransaction.purpose);
      transactionToCreate.status.should.equal(newTransaction.status);
    });

  });

  describe('GET /admin/transaction/:id', function() {
    var transaction;

    beforeEach(function(done) {
      request(app)
        .get('/admin/transaction/' + newTransaction._id)
        .set('authorization', 'Bearer ' + token)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          transaction = res.body;
          done();
        });
    });

    afterEach(function() {
      transaction = {};
    });

    it('should respond with the requested transaction', function() {
      transaction._id.should.equal(newTransaction._id.toString());
      transaction.state.should.equal(newTransaction.state);
      transaction.error.should.equal(newTransaction.error);
      //transaction.createDate.should.equal(newTransaction.createDate.toString());
      //transaction.updateDate.should.equal(newTransaction.updateDate.toString());
      transaction.category.should.equal(newTransaction.category);
      transaction.currency.should.equal(newTransaction.currency);
      transaction.amount.should.equal(newTransaction.amount);
      transaction.purpose.should.equal(newTransaction.purpose);
      transaction.status.should.equal(newTransaction.status);
    });

  });

  describe('PUT /admin/transaction/:id', function() {
    var transaction;

    beforeEach(function(done) {
      request(app)
        .put('/admin/transaction/' + newTransaction._id)
        .set('authorization', 'Bearer ' + token)
        .send(transactionToUpdate)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          transaction = res.body;
          done();
        });
    });

    afterEach(function() {
      transaction = {};
    });

    it('should respond with the updated transaction', function() {
      transaction._id.should.equal(newTransaction._id.toString());
      transaction.state.should.equal(transactionToUpdate.state);
      transaction.error.should.equal(transactionToUpdate.error);
      //transaction.createDate.should.equal(transactionToUpdate.createDate);
      //transaction.updateDate.should.equal(transactionToUpdate.updateDate);
      transaction.category.should.equal(transactionToUpdate.category);
      transaction.currency.should.equal(transactionToUpdate.currency);
      transaction.amount.should.equal(transactionToUpdate.amount);
      transaction.purpose.should.equal(transactionToUpdate.purpose);
      transaction.status.should.equal(transactionToUpdate.status);
    });

  });

  describe('DELETE /admin/transaction/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/admin/transaction/' + newTransaction._id)
        .set('authorization', 'Bearer ' + token)
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when transaction does not exist', function(done) {
      request(app)
        .delete('/admin/transaction/' + newTransaction._id)
        .set('authorization', 'Bearer ' + token)
        .expect(404)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
