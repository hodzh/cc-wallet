'use strict';

var request = require('supertest');

var app = require('../../../index.js').web.express;
var User = require('../../../model/user');

describe('User Admin API:', function() {

  var user;
  var token;

  before(function() {
    return User.removeAsync();
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

  describe('GET /api/me', function() {

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
