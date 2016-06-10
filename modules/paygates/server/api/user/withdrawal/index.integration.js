'use strict';

var mongoose = require('mongoose');
var request = require('supertest');

var app = require('../../../../../../server').web.express;
var User = require('../../../../../../server/model/user');
var Account = require('../../../../../wallet/server/model/account');
var Transaction = require('../../../../../wallet/server/model/transaction');
var Withdrawal = require('../../../model/withdrawal');
var Deposit = require('../../../model/deposit');

describe('Withdrawal API:', function() {

  var withdrawalNew;
  var admin;
  var user;
  var token;
  var paygateAccount;
  var userAccount;
  var currency = 'currency';
  var withdrawalToCreate = {
    amount: '10'
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
    return Withdrawal.removeAsync();
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
          withdrawalToCreate.account = userAccount._id;
        }
      );
  });

  before(function() {
    return Account.enable({
        currency: currency,
        type: 'paygate',
        owner: null
      })
      .then(
        function(account){
          paygateAccount = account;
        }
      );
  });

  before(function() {
    var withdrawal = new Withdrawal({
      owner: user._id,
      account: userAccount._id,
      currency: userAccount.currency,
      amount: '1'
    });
    return withdrawal.save();
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

  describe('GET /api/vp/withdrawal', function() {
    var withdrawals;

    beforeEach(function(done) {
      request(app)
        .get('/api/paygates/withdrawal')
        .set('authorization', 'Bearer ' + token)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          withdrawals = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      withdrawals.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/paygates/withdrawal', function() {

    beforeEach(function(done) {
      request(app)
        .post('/api/paygates/withdrawal/')
        .send(withdrawalToCreate)
        .set('authorization', 'Bearer ' + token)
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          withdrawalNew = res.body;
          done();
        });
    });

    it('should respond with the requested withdrawal', function() {
      withdrawalNew.owner.toString().should.equal(user._id.toString());
      withdrawalNew.account.toString().should.equal(userAccount._id.toString());
    });

  });

  describe('GET /api/paygates/withdrawal/:id', function() {
    var withdrawal;
    beforeEach(function(done) {
      request(app)
        .get('/api/paygates/withdrawal/' + withdrawalNew._id)
        .set('authorization', 'Bearer ' + token)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          withdrawal = res.body;
          done();
        });
    });

    it('should respond with the requested withdrawal', function() {
      withdrawalNew.owner.toString().should.equal(withdrawal.owner.toString());
      withdrawalNew.account.toString().should.equal(withdrawal.account.toString());
    });

  });

});
