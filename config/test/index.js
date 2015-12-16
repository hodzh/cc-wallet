'use strict';

module.exports = {

  auth: require('./auth'),
  db: require('./db'),
  email: require('./email'),
  web: require('./web'),

  app: {
    name: 'Walle-test'
  },

  logging: {
    format: 'common'
  }

};
