var log = require('log4js').getLogger('wallet');

export = transactionProcess;

function transactionProcess(schema, Account) {

  schema.statics.process = process;
  schema.statics.rollback = rollback;

  function process(transaction) {
    var Transaction = this;

    return transactionFrom(transaction)
      .then(() => Transaction.emitEvent('processFrom', transaction))
      .then(() => Transaction.emitEvent('processFrom:' +
        transaction._id, transaction))
      .then(() => transactionTo(transaction))
      .then(() => Transaction.emitEvent('processTo', transaction))
      .then(() => Transaction.emitEvent('processTo:' +
        transaction._id, transaction))
      .then(() => Transaction.findByIdAndUpdate(
        transaction._id,
        {
          $set: {
            state: 'commit'
          }
        }))
      .catch(err => {
        log.error('transaction failed', err.message);
        return Transaction.rollback(transaction)
          .then(() => Promise.reject(err));
      })
      .then(() => Promise.all([
        transactionCommitFrom(transaction),
        transactionCommitTo(transaction)
      ]))
      .then(([accountFrom, accountTo]) => Transaction.findByIdAndUpdate(
        transaction._id,
        {
          $set: {
            state: 'done'
          }
        },
        {
          returnNewDocument: true,
          new: true
        })
        .then(transactionNew => Transaction.emitEvent('done', transaction)
          .then(() => ({
            accountFrom: accountFrom,
            accountTo: accountTo,
            transaction: transactionNew
          }))));
  }

  function rollback(transaction) {
    let Transaction = this;
    return rollbackFrom(transaction)
      .then(() => rollbackTo(transaction))
      .then(() => Transaction.findByIdAndUpdate(
        transaction._id,
        {
          $set: {
            state: 'error'
          }
        }))
      .then(() => Transaction.findByIdAndRemove(
        transaction._id))
      .catch(
        err => {
          log.error('transaction rollback failed', err);
        }
      );
  }

  function rollbackTo(transaction) {
    return Account.update(
      {
        _id: transaction.to,
        pendingTransactions: transaction._id
      },
      {
        $inc: {
          balance: transaction.amount.negate().toString()
        },
        $pull: {pendingTransactions: transaction._id}
      })
      .then(
        result => {
          if (result.nModified !== 1 &&
            result.nModified !== 0) {
            throw new Error('failed rollback to');
          }
        }
      );
  }

  function rollbackFrom(transaction) {
    return Account.update(
      {
        _id: transaction.from,
        pendingTransactions: transaction._id
      },
      {
        $inc: {
          balance: transaction.amount.toString()
        },
        $pull: {pendingTransactions: transaction._id}
      })
      .then(
        result => {
          if (result.nModified !== 1 &&
            result.nModified !== 0) {
            throw new Error('failed rollback from');
          }
        }
      );
  }

  function transactionTo(transaction) {
    return Account.update(
      {
        _id: transaction.to,
        pendingTransactions: {
          $ne: transaction._id
        }
      },
      {
        $inc: {
          balance: transaction.amount.toString()
        },
        $push: {
          pendingTransactions: transaction._id
        }
      })
      .then(result => {
        if (result.nModified !== 1) {
          throw new Error('failed process to');
        }
      });
  }

  function transactionFrom(transaction) {
    return Account.update(
      {
        _id: transaction.from,
        pendingTransactions: {
          $ne: transaction._id
        }
      },
      {
        $inc: {
          balance: transaction.amount.negate().toString()
        },
        $push: {
          pendingTransactions: transaction._id
        }
      })
      .then(result => {
        if (result.nModified !== 1) {
          throw new Error('failed process from');
        }
      });
  }

  function transactionCommitTo(transaction) {
    return Account.findOneAndUpdate({
        _id: transaction.to,
        pendingTransactions: transaction._id
      },
      {
        $pull: {
          pendingTransactions: transaction._id
        }
      },
      {
        returnNewDocument: true,
        new: true
      })
      .then(
        result => {
          if (!result) {
            throw new Error('failed commit to');
          }
          return result;
        }
      );
  }

  function transactionCommitFrom(transaction) {
    return Account.findOneAndUpdate({
        _id: transaction.from,
        pendingTransactions: transaction._id
      },
      {
        $pull: {
          pendingTransactions: transaction._id
        }
      },
      {
        returnNewDocument: true,
        new: true
      })
      .then(
        result => {
          if (!result) {
            throw new Error('failed commit from');
          }
          return result;
        }
      );
  }

}
