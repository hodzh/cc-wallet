'use strict';

module.exports = {
  enable: true,
  hostname: 'http://localhost:3002',

  http: {
    port: process.env.PORT || 7002
  },
  https: {
    port: false,

    // Paths to key and cert as string
    ssl: {
      key: '',
      cert: ''
    }
  },

  static: './dist/cc-wallet/client',
  log: 'tiny',

  bodyParser: {
    json: {
      limit: '100kb'
    },
    urlencoded: {
      limit: '100kb',
      extended: true
    }
  }
};
