'use strict';

module.exports = {
  Bitcoin : {
    //enable: true,
    maxConfirmations: 6,
    updateInterval  : 60,

    client: {
      uri    : "http://localhost:4001/rpc/Bitcoin",
      timeout: 600000 // ms
    }
  },
  Dogecoin: {
    enable          : true,
    maxConfirmations: 6,
    updateInterval  : 60,

    client: {
      uri    : "http://localhost:4001/rpc/Dogecoin",
      timeout: 600000 // ms
    }
  },
  Litecoin: {
    //enable: true,
    maxConfirmations: 6,
    updateInterval  : 60,

    client: {
      uri    : "http://localhost:4001/rpc/Litecoin",
      timeout: 600000 // ms
    }
  }
};
