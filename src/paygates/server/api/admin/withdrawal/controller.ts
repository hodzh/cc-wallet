'use strict';

var log = require('log4js').getLogger('paygates');
var Withdrawal = require('../../../model/withdrawal');
var controller = require('../../../../../core/server/web/controller');
var CollectionController = require('../../../../../core/server/web/collection-controller');
export = CollectionController(Withdrawal);
