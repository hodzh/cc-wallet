var async = require('async');

var express = require('express');

var app = {
    config: null,
    db: require('./db'),
    auth: require('./auth'),
    web: require('./web'),
    start: start
};

module.exports = app;

function start(config, callback){
    app.config = config;

    async.series([

            app.db.init.bind(app.db, config.db),
            initDb,
            initWeb,
            app.web.start.bind(app.web, config.web)],

        function(err) {
            if (err) {
                return callback(err);
            }
            return callback();
        }
    );

    function initDb(callback){
        app.db.models = {
            user: require('./api/user/user.model'),
            thing: require('./api/thing/thing.model')
        };
        callback();
    }

    function initWeb(callback){

        var web = app.web;
        var auth = app.auth;

        web.init(config);

        // register all routes

        web.use('/auth', require('./auth/route'));

        var routers = {
            '/api/users' : require('./api/user'),
            '/api/things' : require('./api/thing')
        };

        Object.keys(routers).forEach(registerApi);

        callback();

        function registerApi(apiKey){
            var api = routers[apiKey];
            web.use(apiKey, api(express.Router(), auth));
        }
    }
}