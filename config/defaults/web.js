'use strict';

module.exports = {
  // Set bodyParser options
  bodyParser: {
    json: {
      limit: '100kb'
    },
    urlencoded: {
      limit: '100kb',
      extended: true
    }
  }
};
