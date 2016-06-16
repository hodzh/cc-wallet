'use strict';

module.exports = paygates;

function paygates(server, config){

  var Promise = require('bluebird');
  var path = require('path');
  var log = require('log4js').getLogger('paygates');
  var auth = require('./auth');
  var approve = require('./approve');

  var paygatesModels = require('./model');
  server.db.models.deposit = paygatesModels.deposit;
  server.db.models.withdrawal = paygatesModels.withdrawal;

  server.db.models.withdrawal.on('unconfirmed', onWithdrawalUnconfirmed);
  server.db.models.withdrawal.on('confirmed', onWithdrawalConfirmed);

  server.web.route({
    '/aapi/paygates/deposit': require('./api/admin/deposit')(),
    '/aapi/paygates/withdrawal': require('./api/admin/withdrawal')(),
    '/api/paygates/deposit': require('./api/user/deposit')(),
    '/api/paygates/withdrawal': require('./api/user/withdrawal')()
  });

  function onWithdrawalUnconfirmed(withdrawal) {
    log.trace('on unconfirmed withdrawal');
    return Promise.resolve()
      .then(function () {
        return auth(withdrawal);
      })
      .catch(function (error) {
        log.error(error);
      });
  }

  function onWithdrawalConfirmed(withdrawal) {
    log.trace('on confirmed withdrawal');
    return Promise.resolve()
      .then(function () {
        return approve(withdrawal);
      })
      .catch(function (error) {
        log.error(error);
      });
  }
}