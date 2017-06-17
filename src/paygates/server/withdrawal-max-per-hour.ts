const Withdrawal = require('./model/withdrawal');
const WithdrawalStat = require('./model/withdrawal-stat');

export class WithdrawalMaxPerHour {
  constructor(private config) {
    Withdrawal.onEvent('presave', withdrawal => this.check(withdrawal));
  }

  check(withdrawal) {
    if (!withdrawal.isNew) {
      return;
    }
    return WithdrawalStat.onNewWithdrawal(withdrawal,
      this.config.paygates.withdrawal.maxPerHour)
      .catch((err) => {
        if (err.code === 11000) {
          return Promise.reject(new Error(
            `You have exceeded the max ${
              this.config.paygates.withdrawal.maxPerHour
            } withdrawals per hour allowed`));
        }
        return Promise.reject(err);
      });
  }
}
