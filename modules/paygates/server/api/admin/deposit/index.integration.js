'use strict';

var request = require('supertest');

var app = require('../../../../../../server').web.express;
var User = require('../../../../../../server/model/user');
var Account = require('../../../../../wallet/server/model/account');
var Transaction = require('../../../../../wallet/server/model/transaction');
var Deposit = require('../../../model/deposit');

describe('Deposit Admin API:', function() {

  var user;
  var token;
  var currency = 'currency';
  var userAccount;
  var newDeposit;

  var depositToCreate = {
    address:'address',
    txid: 'txid',
    amount: '1'
  };

  var depositToUpdate = {
    address:'address2',
    txid: 'txid2',
    amount: '12'
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

  before(function() {
    return Deposit.removeAsync();
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

  before(function() {
    return Account.enable({
        currency: currency,
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
    depositToCreate.owner = user._id;
    depositToCreate.currency = currency;
    depositToCreate.account = userAccount._id;
  });

  before(function(done) {
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

  after(function() {
    return Deposit.removeAsync();
  });

  describe('GET /aapi/paygates/deposit', function() {
    var deposits;

    beforeEach(function(done) {
      request(app)
        .get('/aapi/paygates/deposit')
        .set('authorization', 'Bearer ' + token)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          deposits = res.body;
          done(err);
        });
    });

    it('should respond with JSON array', function() {
      deposits.should.be.instanceOf(Array);
      deposits.length.should.equal(0);
    });

  });

  describe('POST /aapi/paygates/deposit', function() {

    beforeEach(function(done) {
      request(app)
        .post('/aapi/paygates/deposit')
        .set('authorization', 'Bearer ' + token)
        .send(depositToCreate)
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          newDeposit = res.body;
          done(err);
        });
    });

    it('should respond with the newly created deposit', function() {
      newDeposit.currency.should.equal(depositToCreate.currency);
    });

  });

  describe('GET /aapi/paygates/deposit/:id', function() {
    var deposit;

    beforeEach(function(done) {
      request(app)
        .get('/aapi/paygates/deposit/' + newDeposit._id)
        .set('authorization', 'Bearer ' + token)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          deposit = res.body;
          done(err);
        });
    });

    afterEach(function() {
      deposit = {};
    });

    it('should respond with the requested deposit', function() {
      newDeposit.currency.should.equal(deposit.currency);
    });

  });

  describe('PUT /aapi/paygates/deposit/:id', function() {
    var updatedDeposit;

    beforeEach(function(done) {
      request(app)
        .put('/aapi/paygates/deposit/' + newDeposit._id)
        .set('authorization', 'Bearer ' + token)
        .send(depositToUpdate)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          updatedDeposit = res.body;
          done(err);
        });
    });

    afterEach(function() {
      updatedDeposit = {};
    });

    it('should respond with the updated deposit', function() {
      updatedDeposit.address.should.equal(depositToUpdate.address);
    });

  });

  describe('DELETE /aapi/paygates/deposit/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/aapi/paygates/deposit/' + newDeposit._id)
        .set('authorization', 'Bearer ' + token)
        .expect(204)
        .end(function(err, res) {
          done(err);
        });
    });

    it('should respond with 404 when deposit does not exist', function(done) {
      request(app)
        .delete('/aapi/paygates/deposit/' + newDeposit._id)
        .set('authorization', 'Bearer ' + token)
        .expect(404)
        .end(function(err, res) {
          done(err);
        });
    });

  });

});
