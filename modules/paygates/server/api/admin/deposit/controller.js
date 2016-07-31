'use strict';

var log = require('log4js').getLogger('paygates');
var Deposit = require('../../../model/deposit');
var controller = require('../../../../../core/server/web/controller');
var CollectionController = require('../../../../../core/server/web/collection-controller');
module.exports = CollectionController(Deposit);
