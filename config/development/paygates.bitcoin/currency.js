'use strict';

module.exports = {
  Bitcoin : {
    //enable: true,
    maxConfirmations: 12,
    updateInterval  : 60,

    client: {
      uri    : "http://localhost:4001/rpc/Bitcoin",
      timeout: 30000 // ms
    }
  },
  Dogecoin: {
    enable          : true,
    maxConfirmations: 12,
    updateInterval  : 60,

    client: {
      uri    : "http://localhost:4001/rpc/Dogecoin",
      timeout: 30000 // ms
    }
  },
  Litecoin: {
    //enable: true,
    maxConfirmations: 12,
    updateInterval  : 60,

    client: {
      uri    : "http://localhost:4001/rpc/Litecoin",
      timeout: 30000 // ms
    }
  }
};
