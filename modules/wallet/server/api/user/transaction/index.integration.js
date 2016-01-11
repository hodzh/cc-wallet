'use strict';

var request = require('supertest');

var app = require('../../../../../../server').web.express;
var User = require('../../../../../../server/model/user');

var newTransaction;

describe('Transaction API:', function() {

  var user;
  var token;

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

  beforeEach(function(done) {
    request(app)
      .post('/auth/local')
      .send({
        email: 'user@user.user',
        password: 'user'
      })
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) {
          return done(err);
        }
        done();
      });
  });

  describe('GET /api/transaction', function() {
    var transactions;

    beforeEach(function(done) {
      request(app)
        .get('/api/transaction')
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

});
