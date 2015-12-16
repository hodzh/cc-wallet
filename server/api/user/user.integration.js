'use strict';

var app = require('../..').web.express;
var User = require('./user.model');
var request = require('supertest');

describe('User API:', function() {

  var user;

  // Clear users before testing
  before(function() {
    return User.removeAsync().then(function() {
      user = new User({
        name: 'Fake User',
        email: 'test@example.com',
        password: 'password'
      });

      return user.saveAsync();
    });
  });

  // Clear users after testing
  after(function() {
    return User.removeAsync();
  });

  describe('GET /api/users/me', function() {
    var token;

    before(function(done) {
      request(app)
        .post('/auth/local')
        .send({
          email: 'test@example.com',
          password: 'password'
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
        .get('/api/users/me')
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
        .get('/api/users/me')
        .expect(401)
        .end(done);
    });
  });
});
