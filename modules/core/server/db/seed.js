var async = require('async');
var log = require('log4js').getLogger('db');

module.exports = seed;

function seed(models, config, callback){

  if (!config) {
    return callback();
  }

  async.each(
    Object.keys(config),
    seedCollection,
    onSeed);

  function resolve(obj, path){
    if(path) {
      var r = path.split('.');
      return resolve(obj[r.shift()], r.join('.'));
    }
    return obj;
  }

  function seedCollection(name, callback) {
    log.info('seed', name);
    var seed = config[name];
    var model = resolve(models, name);

    async.series(
      [
        clear,
        dropIndexes,
        add
      ],
      onSeedCollection);

    function onSeedCollection(err) {
      if (err && err.errmsg === 'ns not found'){
        return callback();
      }
      callback(err);
    }

    function clear(callback) {
      if (!seed.clear) {
        return callback();
      }
      model.find({}).remove(callback);
    }

    function dropIndexes(callback) {
      if (!seed.clear) {
        return callback();
      }
      model.collection.dropIndexes(callback);
    }

    function add(callback) {
      async.each(seed.add, addItem, callback);
      function addItem(item, callback) {
        log.info('seed', name, JSON.stringify(item));
        var itemModel = new model(item);
        itemModel.save(callback);
      }
    }
  }

  function onSeed(err) {
    callback(err);
  }
}