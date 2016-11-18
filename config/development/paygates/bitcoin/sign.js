'use strict';

module.exports = {
  secret: require('path').join(__dirname, 'withdrawal.pem'),
  algorithm: 'RSA-SHA256',
  format: 'base64'
};
