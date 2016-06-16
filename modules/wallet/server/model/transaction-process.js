
module.exports = transactionProcess;

function transactionProcess(schema, Account) {

  schema.statics.process = process;
  schema.statics.rollback = rollback;

  function process(transaction) {
    var Transaction = this;

    return transactionFrom(transaction)
      .then(
        function () {
          return Transaction.emit('processFrom', transaction);
        }
      )
      .then(
        function () {
          return Transaction.emit('processFrom:' + transaction._id, transaction);
        }
      )
      .then(function () {
        return transactionTo(transaction);
      })
      .then(
        function () {
          return Transaction.emit('processTo', transaction);
        }
      )
      .then(
        function () {
          return Transaction.emit('processTo:' + transaction._id, transaction);
        }
      )
      .then(function () {
        return Transaction.findByIdAndUpdate(
          transaction._id,
          {
            $set: {
              state: 'commit'
            }
          });
      })
      .catch(
        function (err) {
          console.log('transaction failed', err);
          return Transaction.rollback(transaction)
            .then(
              function () {
                throw new Error(err);
              }
            );
        }
      )
      .then(function () {
        return [
          transactionCommitFrom(transaction),
          transactionCommitTo(transaction)
        ];
      })
      .spread(function (accountFrom, accountTo) {
        return Transaction.findByIdAndUpdate(
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
          .then(function (transactionNew) {
            return Transaction.emit('done', transaction)
              .then(function () {
                return {
                  accountFrom: accountFrom,
                  accountTo: accountTo,
                  transaction: transactionNew
                };
              });
          });
      });
  }
  function rollback(transaction) {
    var Transaction = this;
    return rollbackFrom(transaction)
      .then(function () {
        return rollbackTo(transaction);
      })
      .then(function () {
        return Transaction.findByIdAndUpdate(
          transaction._id,
          {
            $set: {
              state: 'error'
            }
          });
      })
      .then(function () {
        return Transaction.findByIdAndRemove(
          transaction._id);
      })
      .catch(
        function (err) {
          console.log('transaction rollback failed', err);
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
          balance: transaction.amount.negate()
        },
        $pull: {pendingTransactions: transaction._id}
      })
      .then(
        function (result) {
          if (result.nModified !== 1 &&
            result.nModified !== 0) {
            return Promise.reject(Error('failed rollback to'));
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
          balance: transaction.amount
        },
        $pull: {pendingTransactions: transaction._id}
      })
      .then(
        function (result) {
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
          balance: transaction.amount
        },
        $push: {
          pendingTransactions: transaction._id
        }
      })
      .then(
        function (result) {
          if (result.nModified !== 1) {
            throw new Error('failed process to');
          }
        }
      );
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
          balance: transaction.amount.negate()
        },
        $push: {
          pendingTransactions: transaction._id
        }
      })
      .then(
        function (result) {
          if (result.nModified !== 1) {
            throw new Error('failed process from');
          }
        }
      );
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
        function (result) {
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
        function (result) {
          if (!result) {
            throw new Error('failed commit from');
          }
          return result;
        }
      );
  }

}