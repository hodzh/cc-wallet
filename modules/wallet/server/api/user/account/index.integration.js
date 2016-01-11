'use strict';

var request = require('supertest');

var app = require('../../../../../../server').web.express;
var User = require('../../../../../../server/model/user');

var newAccount;

describe('Account API:', function() {

  var user;
  var token;
  var accountNew;
  var currency = 'bitcoin';

  before(function() {
    return User.removeAsync();
  });

  beforeEach(function(done) {
    user = new User({
      provider: 'local',
      email: 'user@user.user',
      password: 'user'
    });
    user.save(auth);

    function auth(err, userModel) {
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
    }
  });

  afterEach(function() {
    return User.removeAsync();
  });

  describe('GET /api/account', function() {
    var accounts;

    beforeEach(function(done) {
      request(app)
        .get('/api/account')
        .set('authorization', 'Bearer ' + token)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          accounts = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      accounts.should.be.instanceOf(Array);
    });

  });

  describe('PUT /api/account/:id/enable', function() {

    beforeEach(function(done) {
      request(app)
        .put('/api/account/' + currency + '/enable')
        .set('authorization', 'Bearer ' + token)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          accountNew = res.body;
          done();
        });
    });

    it('should respond with the requested account', function() {
      accountNew.currency.should.equal(currency);
      accountNew.enable.should.equal(true);
      accountNew.balance.should.equal('0');
    });

  });

  describe('GET /api/account/:id', function() {
    var account;
    beforeEach(function(done) {
      request(app)
        .get('/api/account/' + accountNew._id)
        .set('authorization', 'Bearer ' + token)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          account = res.body;
          done();
        });
    });

    it('should respond with the requested account', function() {
      accountNew.currency.should.equal(account.currency);
      accountNew.enable.should.equal(account.enable);
      accountNew.balance.should.equal(account.balance);
    });

  });

});
