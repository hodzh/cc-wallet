'use strict';

module.exports = {

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

  session: {
    secret: '0KzvgRQePjyZatFJ5BOmaKO8f9zSOHT8X0YwlH75JQcmkwCfc6C8R2cNw5UnZ61J'
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
