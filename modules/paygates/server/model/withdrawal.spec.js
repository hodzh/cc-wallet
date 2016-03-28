'use strict';

var User = require('../../../../server/model/user');
var Account = require('../../../wallet/server/model/account');
var Transaction = require('../../../wallet/server/model/transaction');
var Withdrawal = require('./withdrawal');

describe('Withdrawal Model', function() {

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
    return Withdrawal.removeAsync();
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
      .then(
        function(account){
          userAccount = account;
        }
      );
  });

  before(function() {
    return Account.enable({
        type: 'admin',
        owner: admin._id,
        currency: currency
      }, true)
      .then(
        function(account){
          adminAccount = account;
        }
      );
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
    return Withdrawal.removeAsync();
  });

  it('should begin with no withdrawal', function() {
    return Withdrawal.findAsync({}).should
      .eventually.have.length(0);
  });

});
