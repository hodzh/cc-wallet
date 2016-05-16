
module.exports = paygates;

function paygates(server, config){

  var Promise = require('bluebird');
  var path = require('path');
  var log = require('log4js').getLogger('bitcoin');

  var paygatesModels = require('./model');
  server.db.models.deposit = paygatesModels.deposit;
  server.db.models.withdrawal = paygatesModels.withdrawal;

  var depositEvents = require('./model/deposit-events');
  depositEvents.on('save', onDepositSave);

  server.web.route({
    '/aapi/paygates/deposit': require('./api/admin/deposit')(),
    '/aapi/paygates/withdrawal': require('./api/admin/withdrawal')(),
    '/api/paygates/deposit': require('./api/user/deposit')(),
    '/api/paygates/withdrawal': require('./api/user/withdrawal')()
  });

  function onDepositSave(deposit){
    if (deposit.status != 'confirmed') {
      return;
    }
    processDeposit(deposit);
  }

  function processDeposit(deposit) {
    return Promise.resolve()
      .then(function () {
        return server.db.models.account.enable({
          owner: null,
          type: 'paygate',
          currency: deposit.currency
        });
      })
      .then(function (account) {
        var transaction = new server.db.models.transaction({
          currency: deposit.currency,
          amount: deposit.amount,
          to: deposit.account,
          from: account._id,
          category: 'deposit',
          state: 'new'
        });
        return transaction.save()
          .thenReturn(transaction);
      })
      .then(function (transaction) {
        return server.db.models.transaction
          .process(transaction);
      })
      .then(function (result) {
        log.trace('transaction processed', result.transaction.txid);
      })
      .catch(function (error) {
        log.error(error);
      });
  }
}
