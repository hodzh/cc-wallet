'use strict';

var request = require('supertest');

var app = require('../../../../../../server').web.express;
var User = require('../../../../../../server/model/user');
var Account = require('../../../../../wallet/server/model/account');
var Transaction = require('../../../../../wallet/server/model/transaction');
var Withdrawal = require('../../../model/withdrawal');

describe('Withdrawal Admin API:', function() {

  var admin;
  var user;
  var token;
  var currency = 'currency';
  var newWithdrawal;
  var userAccount;

  var withdrawalToCreate = {
    address:'address',
    txid: 'txid',
    amount: '1',
    fee: '1'
  };

  var withdrawalToUpdate = {
    address:'address2',
    txid: 'txid2',
    amount: '12',
    fee: '12'
  };

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
    return Withdrawal.remove();
  });

  before(function() {
    admin = new User({
      provider: 'local',
      email: 'admin@admin.admin',
      password: 'admin',
      role: 'admin'
    });
    return admin.save();
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

  before(function() {
    return Account.enable({
        currency: currency,
        type: 'user',
        owner: admin._id
      })
      .then(
        function(account){
          userAccount = account;
        }
      );
  });

  before(function() {
    withdrawalToCreate.owner = admin._id;
    withdrawalToCreate.currency = currency;
    withdrawalToCreate.account = userAccount._id;
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

  after(function() {
    return Withdrawal.remove();
  });

  describe('GET /aapi/paygates/withdrawal', function() {
    var withdrawals;

    beforeEach(function(done) {
      request(app)
        .get('/aapi/paygates/withdrawal')
        .set('authorization', 'Bearer ' + token)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          withdrawals = res.body;
          done(err);
        });
    });

    it('should respond with JSON array', function() {
      withdrawals.should.be.instanceOf(Array);
      withdrawals.length.should.equal(0);
    });

  });

  describe('POST /aapi/paygates/withdrawal', function() {

    beforeEach(function(done) {
      request(app)
        .post('/aapi/paygates/withdrawal')
        .set('authorization', 'Bearer ' + token)
        .send(withdrawalToCreate)
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          newWithdrawal = res.body;
          done(err);
        });
    });

    it('should respond with the newly created withdrawal', function() {
      newWithdrawal.currency.should.equal(withdrawalToCreate.currency);
    });

  });

  describe('GET /aapi/paygates/withdrawal/:id', function() {
    var withdrawal;

    beforeEach(function(done) {
      request(app)
        .get('/aapi/paygates/withdrawal/' + newWithdrawal._id)
        .set('authorization', 'Bearer ' + token)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          withdrawal = res.body;
          done(err);
        });
    });

    afterEach(function() {
      withdrawal = {};
    });

    it('should respond with the requested withdrawal', function() {
      newWithdrawal.currency.should.equal(withdrawal.currency);
    });

  });

  describe('PUT /aapi/paygates/withdrawal/:id', function() {
    var updatedWithdrawal;

    beforeEach(function(done) {
      request(app)
        .put('/aapi/paygates/withdrawal/' + newWithdrawal._id)
        .set('authorization', 'Bearer ' + token)
        .send(withdrawalToUpdate)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          updatedWithdrawal = res.body;
          done(err);
        });
    });

    afterEach(function() {
      updatedWithdrawal = {};
    });

    it('should respond with the updated withdrawal', function() {
      updatedWithdrawal.address.should.equal(withdrawalToUpdate.address);
    });

  });

  describe('DELETE /aapi/paygates/withdrawal/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/aapi/paygates/withdrawal/' + newWithdrawal._id)
        .set('authorization', 'Bearer ' + token)
        .expect(204)
        .end(function(err, res) {
          done(err);
        });
    });

    it('should respond with 404 when withdrawal does not exist', function(done) {
      request(app)
        .delete('/aapi/paygates/withdrawal/' + newWithdrawal._id)
        .set('authorization', 'Bearer ' + token)
        .expect(404)
        .end(function(err, res) {
          done(err);
        });
    });

  });

});
