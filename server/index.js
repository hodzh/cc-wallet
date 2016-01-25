var async = require('async');

var app = {
  config: null,
  db: require('./db'),
  auth: require('./auth'),
  web: require('./web'),
  start: start,
  addModules: addModules
};

module.exports = app;

function start(callback){
  async.series([

      app.db.init.bind(app.db, app.config.db),
      buildDbModels,
      initAuth,
      seed,
      initWeb,
      app.web.start.bind(app.web, app.config.web, app.auth)

    ],
    function(err) {
      if (err) {
        return callback(err);
      }
      return callback();
    }
  );

  function buildDbModels(callback){
    app.db.models.user = require('./model/user');
    callback();
  }

  function initAuth(callback){
    var authSetup = require('./auth/setup');
    var userModel = require('./model/user');

    authSetup(userModel, app.config);

    callback();
  }

  function seed(callback){

    if (!app.config.seed) {
      return callback();
    }

    if ('development' !== app.config.env &&
      'test' !== app.config.env) {
      return callback();
    }

    async.each(
      Object.keys(app.config.seed),
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
      var seed = app.config.seed[name];
      var model = resolve(app.db.models, name);

      async.series(
        [
          clear,
          dropIndexes,
          add
        ],
        onSeedCollection);

      function onSeedCollection(err) {
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
          console.log('seed', name, JSON.stringify(item));
          var itemModel = new model(item);
          itemModel.save(callback);
        }
      }
    }

    function onSeed(err) {
      callback(err);
    }
  }

  function initWeb(callback){

    var web = app.web;
    var auth = app.auth;

    web.init(app.config);

    // register core routes

    web.route({
      '/auth/local': require('./auth/local'),
      '/api/me': require('./api/user/user'),
      '/admin/user': require('./api/admin/user'),
    });

    callback();
  }
}

function addModules(modules) {
  modules.forEach(initModule);
}

function initModule(name) {
  var path = require('path');
  var fs = require('fs');
  var modulePath = path.join(__dirname, '../modules', name, 'server');
  if (!fs.existsSync(modulePath)) {
    return;
  }
  var moduleServer = require(modulePath);
  moduleServer(app, app.config);
}
