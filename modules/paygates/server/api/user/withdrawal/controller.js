'use strict';

var _ = require('lodash');
var Withdrawal = require('../../../model/withdrawal');
var Account = require('../../../../../wallet/server/model/account');
var Transaction = require('../../../../../wallet/server/model/transaction');

module.exports = controllerFactory;

function controllerFactory(game) {
  return {
    index: index,
    show: show,
    create: create
  };

  function index(req, res) {
    Withdrawal.findAsync({
        owner: req.user._id
      })
      .then(responseWithResult(res))
      .catch(handleError(res));
  }

  function show(req, res) {
    Withdrawal.findByIdAsync(req.params.id)
      .then(checkOwner(req.user._id))
      .then(handleEntityNotFound(res))
      .then(
        function (withdrawal) {
          if (!withdrawal) {
            return null;
          }
          return withdrawal.toObject();
        }
      )
      .then(responseWithResult(res))
      .catch(handleError(res));
  }

  function create(req, res) {
    var userId = req.user._id;
    var accountId = req.body.account;
    var currency;
    var amount = req.body.amount;
    var fee = req.body.fee;
    var address = req.body.address;

    Account.findByIdAsync(accountId)
      .then(function (account) {
        if (!account) {
          throw new Error('account not found');
        }
        if (account.owner.toString() != userId) {
          throw new Error('account not found');
        }
        if (account.type != 'user') {
          throw new Error('account not found');
        }
        currency = account.currency;
      })
      .then(function () {
        return Account.enable({
          owner: null,
          type: 'paygate',
          currency: currency
        });
      })
      .then(function (paygate) {
        var transaction = new Transaction({
          currency: currency,
          to: paygate._id,
          from: accountId,
          amount: amount,
          category: 'withdrawal',
          state: 'new'
        });
        return transaction.saveAsync()
          .thenReturn(transaction);
      })
      .then(function (transaction) {
        return Transaction.process(transaction)
          .thenReturn(transaction);
      })
      .then(function (transaction) {
        var withdrawal = new Withdrawal({
          owner: userId,
          account: accountId,
          currency: currency,
          amount: amount,
          fee: fee,
          address: address,
          transaction: transaction._id,
          status: 'new'
        });
        return withdrawal.saveAsync()
          .then(function () {
            //console.log(withdrawal.toObject());
            return withdrawal.toObject();
          });
      })
      .then(responseWithResult(res, 201))
      .catch(handleError(res));
  }
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

function responseWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function checkOwner(id) {
  return function(entity) {
    if (!entity) {
      return null;
    }
    if (entity.owner.toString() != id) {
      return null;
    }
    return entity;
  };
}