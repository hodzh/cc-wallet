'use strict';

var app = require('../../../index').web.express;
var request = require('supertest');
var User = require('../../../model/user');

describe('User API:', function() {

  var user;
  var genUser = function() {
    user = new User({
      provider: 'local',
      email: 'user@user.user',
      password: 'user'
    });
    return user;
  };

  before(function(done) {
    User.remove(function() {
      genUser().save(done);
    });
  });

  after(function() {
    return User.remove();
  });

  describe('GET /api/me', function() {
    var token;

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

    it('should respond with a user profile when authenticated', function(done) {
      request(app)
        .get('/api/me')
        .set('authorization', 'Bearer ' + token)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          res.should.have.property('body');
          res.body.should.have.property('_id');
          res.body._id.toString().should.equal(user._id.toString());
          done();
        });
    });

    it('should respond with a 401 when not authenticated', function(done) {
      request(app)
        .get('/api/me')
        .expect(401)
        .end(done);
    });
  });
});
