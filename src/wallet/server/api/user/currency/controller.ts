export = function (config) {
  return {
    index: index
  };

  function index(req, res) {
    res.json(Object.keys(config.currency)
      .map(key => config.currency[key]));
  }
};
