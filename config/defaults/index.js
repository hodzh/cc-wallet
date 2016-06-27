'use strict';

var path = require('path');

module.exports = {

  env: process.env.NODE_ENV || 'development',
  root: path.normalize(__dirname + '/../..'),

  app: require('./app'),
  assets: require('./assets'),
  currency: require('./currency'),
  db: require('./db'),
  web: require('./web'),
  public: require('./public'),
  modules: require('./modules')
};