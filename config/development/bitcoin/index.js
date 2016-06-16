module.exports = {
  currency: {
    dogecoin: require('./dogecoin'),
    dash: require('./dash'),
    bitcoin: require('./bitcoin')
  },
  sign: require('./sign')
};