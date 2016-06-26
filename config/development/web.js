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
  }
};
