import { QueryResult } from '../../common/query-result';

const DEFAULT_QUERY_LIMIT = 10;
const MAX_QUERY_LIMIT = 1000;

export = function (schema, pluginOptions) {
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
      limit = DEFAULT_QUERY_LIMIT;
    }
    limit = Math.min(limit, MAX_QUERY_LIMIT);
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
      skip = 0;
    }
    if (limit <= 0) {
      throw new Error('limit should be positive');
    }
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
    return Promise
      .all([
        docsQuery.exec()
          .then((docs) => {
            if (lean && leanWithId) {
              docs.forEach((doc) => {
                doc.id = String(doc._id);
              });
            }
            return docs;
          }),
        this.count(query).exec(),
      ])
      .then(([docs, count]) => {
        let result: QueryResult = {
          docs: docs.map(doc => (doc.sanitize || doc.toObject).call(doc)),
          total: count,
          limit: limit,
        };
        if (typeof offset !== 'undefined') {
          result.offset = offset;
        }
        if (typeof page !== 'undefined') {
          result.page = page;
          result.pages = Math.ceil(count / limit) || 1;
        }
        if (typeof callback === 'function') {
          return callback(null, result);
        }
        return result;
      });
  }
};
