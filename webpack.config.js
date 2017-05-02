var configClient = require('./webpack-client');
var configServer = require('./webpack-server');

module.exports = [
  ...require('./src/app/cc-wallet/webpack.config'),
  ...require('./src/app/cc-bitcoind/webpack.config'),
];
