'use strict';
import {QueryResult} from '../../common/query-result';

var Promise = require('bluebird');

export = function(schema, pluginOptions) {
  schema.statics.query = query;

  /**
   * @param {Object} [query={}]
   * @param {Object} [options={}]
   * @param {Object|String} [options.select]
   * @param {Object|String} [options.sort]
   * @param {Array|Object|String} [options.populate]
   * @param {Boolean} [options.lean=false]
   * @param {Boolean} [options.leanWithId=true]
   * @param {Number} [options.offset=0] - Use offset or page to set skip position
   * @param {Number} [options.page=1]
   * @param {Number} [options.limit=10]
   * @param {Function} [callback]
   * @returns {Promise}
   */
  function query(query, options, callback) {
    query = query || {};
    options = Object.assign({}, pluginOptions, options);
    let select = options.select;
    let sort = options.sort;
    let populate = options.populate;
    let lean = options.lean || false;
    let leanWithId = typeof options.leanWithId !== 'undefined'
      ? Boolean(options.leanWithId) : true;
    let limit = parseInt(options.limit);
    if (limit <= 0 || isNaN(limit)) {
      limit = 10;
    }
    let page, offset, skip, promises;
    if (options.offset) {
      offset = Number(options.offset);
      skip = offset;
    } else if (options.page) {
      page = Number(options.page);
      skip = (page - 1) * limit;
    } else {
      page = 1;
      offset = 0;
      skip = offset;
    }
    if (limit <= 0) {
      throw new Error('limit should be positive');
    }
    if (limit) {
      let docsQuery = this.find(query)
        .select(select)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .lean(lean);
      if (populate) {
        [].concat(populate).forEach((item) => {
          docsQuery.populate(item);
        });
      }
      promises = {
        docs: docsQuery.exec(),
        count: this.count(query).exec()
      };
      if (lean && leanWithId) {
        promises.docs = promises.docs.then((docs) => {
          docs.forEach((doc) => {
            doc.id = String(doc._id);
          });
          return docs;
        });
      }
    }
    promises = Object.keys(promises).map((x) => promises[x]);
    return Promise.all(promises).then((data) => {
      let result: QueryResult = {
        docs: data[0].map(doc => (doc.sanitize || doc.toObject).call(doc)),
        total: data[1],
        limit: limit
      };
      if (typeof offset !== 'undefined') {
        result.offset = offset;
      }
      if (typeof page !== 'undefined') {
        result.page = page;
        result.pages = Math.ceil(data.count / limit) || 1;
      }
      if (typeof callback === 'function') {
        return callback(null, result);
      }
      return result;
    });
  }
};
