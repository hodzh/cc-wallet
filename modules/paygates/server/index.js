
module.exports = paygates;

function paygates(server, config){

  var Promise = require('bluebird');
  var path = require('path');

  var paygatesModels = require('./model');
  server.db.models.deposit = paygatesModels.deposit;
  server.db.models.withdrawal = paygatesModels.withdrawal;

  server.web.route({
    '/aapi/paygates/deposit': require('./api/admin/deposit')(),
    '/aapi/paygates/withdrawal': require('./api/admin/withdrawal')(),
    '/api/paygates/deposit': require('./api/user/deposit')(),
    '/api/paygates/withdrawal': require('./api/user/withdrawal')()
  });
}
