'use strict';

module.exports = function(config) {
  return {
    index: index
  };
  
  function index(req, res) {
    res.json(Object.values(config.currency));
  }
};
