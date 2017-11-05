'use strict';

module.exports = {
  updateInterval  : 60,
  client: {
    url    : "http://localhost:4001/api/bitcoind/",
    timeout: 600000,
    auth   : {
      url     : 'http://localhost:4001/auth/local',
      email   : 'ehodzh@ngs.ru',
      password: '123',
    }
  },
  sign: {
    algorithm: 'RSA-SHA256',
    format: 'base64'
  },
};
