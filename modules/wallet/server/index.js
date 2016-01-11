
module.exports = wallet;

function wallet(server, config){

  var path = require('path');
  config.merge(path.join(__dirname, '../config'));

  server.db.models.account = require('./model/account');
  server.db.models.transaction = require('./model/transaction');

  server.web.route({
    '/admin/account': require('./api/admin/account'),
    '/admin/transaction': require('./api/admin/transaction'),
    '/api/account': require('./api/user/account')(config),
    '/api/transaction': require('./api/user/transaction')
  });
}
