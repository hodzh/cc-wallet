import { currencies } from './currencies';

export = wallet;

async function wallet(server, config) {
  server.db.models.account = require('./model/account');
  server.db.models.transaction = require('./model/transaction');

  await currencies.init();

  server.web.route({
    '/aapi/currency': require('./api/admin/currency'),
    '/aapi/account': require('./api/admin/account'),
    '/aapi/transaction': require('./api/admin/transaction'),
    '/api/currency': require('./api/user/currency')(),
    '/api/account': require('./api/user/account')(),
    '/api/transaction': require('./api/user/transaction')(),
  });
}
