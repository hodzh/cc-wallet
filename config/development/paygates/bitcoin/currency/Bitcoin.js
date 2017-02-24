'use strict';

module.exports = {
  //enable: true,
  maxConfirmations: 2,
  updateInterval: 60,
  minWithdrawal: '0.00010000',

  client: {
    uri: "http://localhost:4001/rpc/Bitcoin",
    timeout: 30000 // ms
  }
};
