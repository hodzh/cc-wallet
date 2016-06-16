'use strict';

var Promise = require('bluebird');
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
    return User.remove();
  });

  before(function() {
    return Account.remove();
  });

  before(function() {
    return Transaction.remove();
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
    return User.remove();
  });

  after(function() {
    return Account.remove();
  });

  after(function() {
    return Transaction.remove();
  });

  it('should begin with no transactions', function() {
    return Transaction.find({}).should
      .eventually.have.length(0);
  });

  describe('income', function(){

    it('should process', function() {
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

  });

  describe('outcome', function(){

    it('should process', function() {
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

  describe('process events', function(){

    var events = ['processTo', 'processFrom', 'done']
    var promises = {};
    var resolves = {};
    var handlers = {};

    function onEvent(name) {
      setTimeout(resolves[name].bind(
        promises[name],
        name), 0);
      return promises[name];
    }

    beforeEach(function(){
      events.forEach(function(name){
        var promise = new Promise(function(resolve, reject){
          resolves[name] = resolve;
        });
        var handler = onEvent.bind(this, name);
        promises[name] = promise;
        handlers[name] = handler;
        Transaction.on(name, handler);
      });
    });

    afterEach(function(){
      events.forEach(function(name){
        var handler = handlers[name];
        Transaction.off(name, handler);
      });
    });

    it('should invoke and resolve events due process income', function() {
      return Transaction.income(admin._id, userAccount._id, {
          amount: '10'
        })
        .then(function(){
          promises.processTo.should.eventually.equal('processTo');
          promises.processFrom.should.eventually.equal('processFrom');
          promises.done.should.eventually.equal('done');
        })
        .should.be.fulfilled;
    });

    it('should invoke and resolve events due process outcome', function() {
      return Transaction.outcome(admin._id, userAccount._id, {
          amount: '10'
        })
        .then(function(){
          promises.processTo.should.eventually.equal('processTo');
          promises.processFrom.should.eventually.equal('processFrom');
          promises.done.should.eventually.equal('done');
        })
        .should.be.fulfilled;
    });

  });

  describe('rollback', function(){

    beforeEach(function(){
      return Account.findById(userAccount._id)
        .then(
          function(account){
            userAccount = account;
          }
        );
    });

    beforeEach(function(){
      return Account.findById(adminAccount._id)
        .then(
          function(account){
            adminAccount = account;
          }
        );
    });

    afterEach(function(){
      return Account.findById(userAccount._id)
        .then(
          function(account){
            // a test of this section
            // shouldn't change balance value
            userAccount.balance.toString()
              .should.equal(account.balance.toString());
          }
        );
    });

    afterEach(function(){
      return Account.findById(adminAccount._id)
        .then(
          function(account){
            // a test of this section
            // shouldn't change balance value
            adminAccount.balance.toString()
              .should.equal(account.balance.toString());
          }
        );
    });

    describe('on reject processTo', function(){

      function onProcessTo() {
        return Promise.rejected('onProcessTo');
      }

      beforeEach(function(){
        Transaction.on('processTo', onProcessTo);
      });

      afterEach(function(){
        Transaction.off('processTo', onProcessTo);
      });

      it('should rollback income if processTo has rejected', function() {

        return Transaction.income(admin._id, userAccount._id, {
            amount: '10'
          })
          .should.be.rejectedWith('onProcessTo');
      });

      it('should rollback outcome if processTo has rejected', function() {

        return Transaction.outcome(admin._id, userAccount._id, {
            amount: '10'
          })
          .should.be.rejectedWith('onProcessTo');
      });
    });

    describe('on reject processTo:id', function(){

      var transaction;

      beforeEach(function(){
        Transaction.on('save', onSave);
      });

      function onSave(transactionNew) {
        transaction = transactionNew;
        Transaction.on('processTo:' + transaction._id, onProcessTo);
      }

      function onProcessTo() {
        return Promise.rejected('onProcessTo');
      }

      afterEach(function(){
        Transaction.off('save', onSave);
      });

      afterEach(function(){
        Transaction.off('processTo:' + transaction._id, onProcessTo);
      });

      it('should rollback income if processTo:id has rejected', function() {

        return Transaction.income(admin._id, userAccount._id, {
            amount: '10'
          })
          .should.be.rejectedWith('onProcessTo');
      });

      it('should rollback outcome if processTo:id has rejected', function() {

        return Transaction.outcome(admin._id, userAccount._id, {
            amount: '10'
          })
          .should.be.rejectedWith('onProcessTo');
      });
    });

    describe('on reject processFrom', function(){

      function onProcessFrom() {
        return Promise.rejected('onProcessFrom');
      }

      beforeEach(function(){
        Transaction.on('processFrom', onProcessFrom);
      });

      afterEach(function(){
        Transaction.off('processFrom', onProcessFrom);
      });

      it('should rollback income if processFrom has rejected', function() {

        return Transaction.income(admin._id, userAccount._id, {
            amount: '10'
          })
          .should.be.rejectedWith('onProcessFrom');
      });

      it('should rollback outcome if processFrom has rejected', function() {

        return Transaction.outcome(admin._id, userAccount._id, {
            amount: '10'
          })
          .should.be.rejectedWith('onProcessFrom');
      });

    });

    describe('on reject processFrom:id', function(){

      var transaction;

      beforeEach(function(){
        Transaction.on('save', onSave);
      });

      function onSave(transactionNew) {
        transaction = transactionNew;
        Transaction.on('processFrom:' + transaction._id, onProcessFrom);
      }

      function onProcessFrom() {
        return Promise.rejected('onProcessFrom');
      }

      afterEach(function(){
        Transaction.off('save', onSave);
      });

      afterEach(function(){
        Transaction.off('processFrom:' + transaction._id, onProcessFrom);
      });

      it('should rollback income if processFrom:id has rejected', function() {

        return Transaction.income(admin._id, userAccount._id, {
            amount: '10'
          })
          .should.be.rejectedWith('onProcessFrom');
      });

      it('should rollback outcome if processFrom:id has rejected', function() {

        return Transaction.outcome(admin._id, userAccount._id, {
            amount: '10'
          })
          .should.be.rejectedWith('onProcessFrom');
      });

    });

  });
});