'use strict';

var request = require('supertest');

var app = require('../../../../../../server').web.express;
var User = require('../../../../../../server/model/user');
var Account = require('../../../../../wallet/server/model/account');
var Transaction = require('../../../../../wallet/server/model/transaction');
var Deposit = require('../../../model/deposit');

describe('Deposit API:', function() {

  var depositNew;
  var admin;
  var user;
  var token;
  var adminAccount;
  var userAccount;
  var currency = 'currency';
  var deposit;

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
    admin = new User({
      provider: 'local',
      email: 'admin@admin.admin',
      password: 'admin',
      role: 'admin'
    });
    return admin.saveAsync();
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

  before(function(done) {
      request(app)
        .post('/auth/local')
        .send({
          email: 'user@user.user',
          password: 'user'
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
        currency: currency,
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
    deposit = new Deposit({
      currency: currency,
      owner: user._id,
      account: userAccount._id,
      address: 'address',
      txid: 'txid',
      amount: '1'
    });

    return deposit.saveAsync();
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

  describe('GET /api/paygates/deposit', function() {
    var deposits;

    beforeEach(function(done) {
      request(app)
        .get('/api/paygates/deposit')
        .set('authorization', 'Bearer ' + token)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          deposits = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      deposits.should.be.instanceOf(Array);
    });

  });

  describe('GET /api/paygates/deposit/:id', function() {
    var depositGet;
    beforeEach(function(done) {
      request(app)
        .get('/api/paygates/deposit/' + deposit._id)
        .set('authorization', 'Bearer ' + token)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          depositGet = res.body;
          done();
        });
    });

    it('should respond with the requested deposit', function() {
      depositGet._id.should.equal(deposit._id.toString());
    });

  });

});
