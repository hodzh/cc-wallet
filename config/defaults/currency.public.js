'use strict';

var currency = require('./currency');

module.exports = {
  currency: currency,
  currencies: Object.keys(currency).map(getCurrency)
};

function getCurrency(name) {
  return currency[name];
}