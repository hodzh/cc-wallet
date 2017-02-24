'use strict';

module.exports = {
  enable: true,
  maxConfirmations: 2,
  updateInterval: 60,
  minWithdrawal: '1.00000000',

  client: {
    // uri: "http://10.168.0.55:4001/rpc/Dogecoin",
    uri: "http://localhost:4001/rpc/Dogecoin",
    timeout: 30000 // ms
  }
};
