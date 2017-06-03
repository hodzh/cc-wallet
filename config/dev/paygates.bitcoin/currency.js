'use strict';

module.exports = {
  Bitcoin : {
    //enable: true,
    maxConfirmations: 6,
    updateInterval  : 60,

    client: {
      url    : "http://localhost:4001/api/bitcoind/",
      timeout: 600000,
      auth: {
        url: 'http://localhost:4001/auth/local',
        email: 'ehodzh@ngs.ru',
        password: '123',
      }
    }
  },
  Dogecoin: {
    enable          : true,
    maxConfirmations: 6,
    updateInterval  : 60,

    client: {
      url    : "http://localhost:4001/api/bitcoind/",
      timeout: 600000,
      auth: {
        url: 'http://localhost:4001/auth/local',
        email: 'ehodzh@ngs.ru',
        password: '123',
      }
    }
  },
  Litecoin: {
    //enable: true,
    maxConfirmations: 6,
    updateInterval  : 60,

    client: {
      url    : "http://localhost:4001/api/bitcoind/",
      timeout: 600000,
      auth: {
        url: 'http://localhost:4001/auth/local',
        email: 'ehodzh@ngs.ru',
        password: '123',
      }
    }
  }
};
