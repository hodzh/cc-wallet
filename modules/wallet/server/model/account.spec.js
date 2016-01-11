'use strict';

var app = require('../index.js');
var User = require('../../../../server/model/user');
var Account = require('./account');
var Transaction = require('./transaction');

describe('Account Model', function() {

  var user;
  var admin;
  var currency = 'currency';
  var userAccountId;
  var adminAccountId;
  var userAccount;
  var adminAccount;

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
    user = new User({
      provider: 'local',
      email: 'user@user.user',
      password: 'user'
    });
    return user.saveAsync();
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
    userAccountId = {
      type: 'user',
      owner: user._id,
      currency: currency
    };
    adminAccountId = {
      type: 'admin',
      owner: admin._id,
      currency: currency
    };
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

  it('should begin with no accounts', function() {
    return Account.findAsync({}).should
      .eventually.have.length(0);
  });

  it('should enable user account', function() {
    return Account.enable(userAccountId, true)
      .then(function(account) {
        userAccount = account;
        userAccount.currency.should.equal(userAccountId.currency);
        userAccount.type.should.equal(userAccountId.type);
        userAccount.owner.toString().should.equal(userAccountId.owner.toString());
        userAccount.enable.should.equal(true);
        return account;
      }).should.be.fulfilled;
  });

  it('should get user accounts', function() {
    return Account.getAccounts('user', user._id)
      .then(function(accounts){
        accounts.should.be.instanceOf(Array);
        accounts.length.should.be.equal(1);
        accounts[0]._id.toString().should.be.equal(userAccount._id.toString());
      })
      .should.be.fulfilled;
  });

  it('should fail when saving a duplicate user account', function() {
    var dublicate = new Account(userAccountId);
    return dublicate.saveAsync().should.be.rejected;
  });

  it('should enable admin account', function() {
    return Account.enable(adminAccountId, true)
      .then(function(account) {
        adminAccount = account;
        adminAccount.currency.should.equal(adminAccountId.currency);
        adminAccount.type.should.equal(adminAccountId.type);
        adminAccount.owner.toString().should.equal(adminAccountId.owner.toString());
        adminAccount.enable.should.equal(true);
        return account;
      }).should.be.fulfilled;
  });

  it('should get admin accounts', function() {
    return Account.getAccounts('admin', admin._id)
      .then(function(accounts){
        accounts.should.be.instanceOf(Array);
        accounts.length.should.be.equal(1);
        accounts[0]._id.toString().should.be.equal(adminAccount._id.toString());
      })
      .should.be.fulfilled;
  });

  it('should fail when saving a duplicate admin account', function() {
    var dublicate = new Account(adminAccountId);
    return dublicate.saveAsync().should.be.rejected;
  });

});
