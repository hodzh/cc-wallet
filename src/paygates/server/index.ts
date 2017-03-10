import { WithdrawalMaxPerHour } from './withdrawal-max-per-hour';

var path = require('path');
var log = require('log4js').getLogger('paygates');

export = paygates;

function paygates(server, config) {

  let approve = require('./approve');
  new WithdrawalMaxPerHour(config);

  let paygatesModels = require('./model');
  server.db.models.deposit = paygatesModels.deposit;
  server.db.models.withdrawal = paygatesModels.withdrawal;
  server.db.models.withdrawal.onEvent('confirmed', onConfirmWithdrawal);

  server.web.route({
    '/aapi/paygates/deposit': require('./api/admin/deposit')(),
    '/aapi/paygates/withdrawal': require('./api/admin/withdrawal')(),
    '/api/paygates/deposit': require('./api/user/deposit')(),
    '/api/paygates/withdrawal': require('./api/user/withdrawal')()
  });

  function onConfirmWithdrawal(withdrawal) {
    log.trace('on confirmed withdrawal', withdrawal._id);
    return Promise.resolve()
      .then(() => approve(withdrawal))
      .catch(error => {
        log.error(error);
      });
  }
}
