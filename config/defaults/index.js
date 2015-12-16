'use strict';

var path = require('path');

var rootPath = path.normalize(__dirname + '/../..');

module.exports = {

  env: process.env.NODE_ENV || 'development',
  root: rootPath,

  db: require('./db'),
  web: require('./web'),
  public: require('./public'),
  assets: require('./assets'),
  shared: require('./shared')

};
