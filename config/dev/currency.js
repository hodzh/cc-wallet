'use strict';

module.exports = {
  Bitcoin: {
    //enable: true,
    name: 'Bitcoin',
    code: 'BTC',
    decimal: 8,
    fee: '10000',
    minWithdrawal: '10000',
    depositConfirmations: 10,
    withdrawalConfirmations: 10,
  },
  Dash: {
    //enable: true,
    name: 'Dash',
    code: 'DASH',
    decimal: 8,
    fee: '1000000',
    minWithdrawal: '1000000',
    depositConfirmations: 10,
    withdrawalConfirmations: 10,
  },
  Dogecoin: {
    enable: true,
    name: 'Dogecoin',
    code: 'DOGE',
    decimal: 8,
    fee: '100000000',
    minWithdrawal: '100000000',
    depositConfirmations: 10,
    withdrawalConfirmations: 10,
  },
  Litecoin: {
    enable: true,
    name: 'Litecoin',
    code: 'LTC',
    decimal: 8,
    fee: '1000000',
    minWithdrawal: '1000000',
    depositConfirmations: 10,
    withdrawalConfirmations: 10,
  },
};
