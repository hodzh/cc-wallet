'use strict';

module.exports = {

  auth: require('./auth'),
  db: require('./db'),
  email: require('./email'),
  web: require('./web'),

  app: {
    name: 'Walle-dev'
  },

  debug: true,

  logging: {
    format: 'tiny'
  },

  seed: require('./seed')
};
