'use strict';

var User = require('../../../../server/model/user');
var Account = require('../../../wallet/server/model/account');
var Transaction = require('../../../wallet/server/model/transaction');
var Deposit = require('./deposit');

describe('Deposit Model', function() {

  var user;
  var admin;
  var currency = 'currency';
  var userAccount;
  var adminAccount;

  before(function() {
    return User.remove();
  });

  before(function() {
    return Account.remove();
  });

  before(function() {
    return Transaction.remove();
  });

  before(function() {
    return Deposit.remove();
  });

  before(function() {
    user = new User({
      provider: 'local',
      email: 'user@user.user',
      password: 'user'
    });
    return user.save();
  });

  before(function() {
    admin = new User({
      provider: 'local',
      email: 'admin@admin.admin',
      password: 'admin',
      role: 'admin'
    });
    return admin.save();
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
    return User.remove();
  });

  after(function() {
    return Account.remove();
  });

  after(function() {
    return Transaction.remove();
  });

  after(function() {
    return Deposit.remove();
  });

  it('should begin with no deposit', function() {
    return Deposit.find({}).should
      .eventually.have.length(0);
  });

});
