'use strict';

var path = require('path');
var configClient = require('../../../webpack-client');
var configServer = require('../../../webpack-server');

let root = path.join(__dirname, '../../../');

module.exports = [
  configClient({
    root: root,
    name: 'cc-wallet',
    index: path.join(__dirname, './client/index'),
  }),
  configServer({
    root: root,
    name: 'cc-wallet',
    index: path.join(__dirname, './server/index'),
  }),
];
