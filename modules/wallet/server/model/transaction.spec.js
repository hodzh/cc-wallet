'use strict';

var app = require('../index.js');
var User = require('../../../../server/model/user');
var Account = require('./account');
var Transaction = require('./transaction');

describe('Transaction Model', function() {

  var user;
  var admin;
  var currency = 'currency';
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
    return Account.enable({
        type: 'user',
        owner: user._id,
        currency: currency
      }, true)
      .then(function(account){
        userAccount = account;
        return account;
      });
  });

  before(function() {
    return Account.enable({
        type: 'admin',
        owner: admin._id,
        currency: currency
      }, true)
      .then(function(account){
        adminAccount = account;
        return account;
      });
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

  it('should begin with no transactions', function() {
    return Transaction.findAsync({}).should
      .eventually.have.length(0);
  });

  it('should process income', function() {
    return Transaction.income(admin._id, userAccount._id, {
        amount: '10'
      })
      .then(function(result){
        result.accountFrom._id.toString().should.equal(adminAccount._id.toString());
        result.accountFrom.balance.toString().should.equal('-10');
        result.accountTo._id.toString().should.equal(userAccount._id.toString());
        result.accountTo.balance.toString().should.equal('10');
        result.transaction.from.toString().should.equal(adminAccount._id.toString());
        result.transaction.to.toString().should.equal(userAccount._id.toString());
        result.transaction.amount.toString().should.equal('10');
      });
  });

  it('should process outcome', function() {
    return Transaction.outcome(admin._id, userAccount._id, {
        amount: '10'
      })
      .then(function(result){
        result.accountFrom._id.toString().should.equal(userAccount._id.toString());
        result.accountFrom.balance.toString().should.equal('0');
        result.accountTo._id.toString().should.equal(adminAccount._id.toString());
        result.accountTo.balance.toString().should.equal('0');
        result.transaction.from.toString().should.equal(userAccount._id.toString());
        result.transaction.to.toString().should.equal(adminAccount._id.toString());
        result.transaction.amount.toString().should.equal('10');
      });
  });
});