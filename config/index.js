var defaults = require('./defaults');

var config = {};
setEnv(defaults.env);

module.exports = config;

function setEnv(env){
  var mode = require('./' + env);

  defaults.env = env;
  Object.keys(config).forEach(
    function (key) {
      delete config[key];
    }
  );
  mergeConfig(config, defaults);
  mergeConfig(config, mode);
  config.setEnv = setEnv;
  config.getAssets = getAssets;
}

function mergeConfig(data, dataToMerge){
  Object.keys(dataToMerge).forEach(mergeKey);

  function mergeKey(key) {
    var value = data[key];
    var valueToMerge = dataToMerge[key];
    if (typeof value === 'object' && !(value instanceof Array)) {
      mergeConfig(value, valueToMerge);
      return;
    }
    data[key] = valueToMerge;
  }
}

function getAssets(ext) {
    var jsFiles = [];
    addAssets(config.assets);
    return jsFiles;

    function addAssets(assets) {
        Object.keys(assets).forEach(
            function(key){
                var asset = assets[key];
                if (key === ext) {
                    Object.keys(asset).forEach(
                        function(jsKey){
                            jsFiles = jsFiles.concat(asset[jsKey]);
                        }
                    );
                }
                else if (key === 'css') {

                }
                else if (!(asset instanceof Array)) {
                    addAssets(asset);
                }
            }
        );
    }

}