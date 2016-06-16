'use strict';

var app = require('../index.js');
var User = require('./user');

describe('User Model', function() {

  var user;
  var genUser = function() {
    user = new User({
      provider: 'local',
      email: 'user@user.user',
      password: 'user'
    });
    return user;
  };

  before(function() {
    return User.remove();
  });

  beforeEach(function() {
    genUser();
  });

  afterEach(function() {
    return User.remove();
  });

  it('should begin with no users', function() {
    return User.find({}).should
      .eventually.have.length(0);
  });

  it('should fail when saving a duplicate user', function() {
    return user.save()
      .then(function() {
        var userDup = genUser();
        return userDup.save();
      }).should.be.rejected;
  });

  describe('#email', function() {
    it('should fail when saving without an email', function() {
      user.email = '';
      return user.save().should.be.rejected;
    });
  });

  describe('#password', function() {
    beforeEach(function() {
      return user.save();
    });

    it('should authenticate user if valid', function() {
      user.authenticate('user').should.be.true;
    });

    it('should not authenticate user if invalid', function() {
      user.authenticate('blah').should.not.be.true;
    });
  });

});
