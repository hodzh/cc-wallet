
module.exports = wallet;

function wallet(server, config){

  var path = require('path');

  server.db.models.account = require('./model/account');
  server.db.models.transaction = require('./model/transaction');

  server.web.route({
    '/aapi/account': require('./api/admin/account'),
    '/aapi/transaction': require('./api/admin/transaction'),
    '/api/account': require('./api/user/account')(config),
    '/api/transaction': require('./api/user/transaction')(config),
    '/api/currency': require('./api/user/currency')(config)
  });
}
