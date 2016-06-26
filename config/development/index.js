'use strict';

module.exports = {

  app: require('./app'),
  auth: require('./auth'),
  db: require('./db'),
  email: require('./email'),
  web: require('./web'),
  seed: require('./seed'),
  token: require('./token'),
  log: require('./log'),

  paygates: {
    bitcoin: require('./bitcoin'),
  }
};
