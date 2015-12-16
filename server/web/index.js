'use strict';

var path = require('path');
var http = require('http');

var bodyParser = require('body-parser');
var compression = require('compression');
var cookieParser = require('cookie-parser');
var connectMongo = require('connect-mongo');
var errorHandler = require('errorhandler');
var express = require('express');
var favicon = require('favicon');
var methodOverride = require('method-override');
var passport = require('passport');
var session = require('express-session');
var mongoose = require('mongoose');
var morgan = require('morgan');
var lusca = require('lusca');

var app = express();
var server = http.createServer(app);

module.exports = {
    express: app,
    server: server,
    init: initServer,
    start: startServer,
    use: app.use.bind(app)
};

function initServer(config) {

    app.set('env', config.env);
    app.set('appPath', path.join(config.root, 'public'));

    app.use(compression());
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json());
    app.use(methodOverride());
    app.use(cookieParser());
    app.use(passport.initialize());

    var MongoStore = connectMongo(session);
    var mongoStore = new MongoStore({
        mongooseConnection: mongoose.connection,
        collection: config.web.session.collection
    });
    var sessionStore = session({
        cookie: config.web.session.cookie,
        resave: false,
        secret: config.web.session.secret,
        saveUninitialized: true,
        store: mongoStore
    });
    app.use(sessionStore);

    /**
     * Lusca - express server security
     * https://github.com/krakenjs/lusca
     */
    /*if ('test' !== config.env) {
     app.use(lusca({
     csrf: {
     angular: true
     },
     xframe: 'SAMEORIGIN',
     hsts: {
     maxAge: 60 * 60 * 24 * 365, //1 year, in seconds
     includeSubDomains: true,
     preload: true
     },
     xssProtection: true
     }));
     }*/

    if ('production' === config.env) {
        app.use(morgan('dev'));
    }

    if ('development' === app.get('env')) {
        app.use(require('connect-livereload')());
    }

    if ('development' === config.env || 'test' === config.env) {
        app.use(morgan('dev'));
    }

    //app.use(require('./io'));
}

function startServer(config, callback) {

    beforeStart();

    server.listen(config.http.port, function(err) {
        if (err){
            return callback(err);
        }

        console.log('Walle server listening on %d, in %s mode',
          config.http.port, app.get('env'));

        callback();
    });
}

function beforeStart(){

    // use static api

    app.use(express.static(app.get('appPath')));
    //app.use(favicon(path.join(app.get('appPath'), 'favicon.ico')));

    if ('development' === app.get('env' || 'test' === config.env)) {
        app.use(require('connect-livereload')());
        app.use('/client',
          express.static(path.join(app.get('appPath'), '../client')));
        app.use('/bower_components',
          express.static(path.join(app.get('appPath'), '../bower_components')));
    }

    // render index.html otherwise

    app.get('/*', renderRoot);

    // error handler has to be last

    if ('development' === app.get('env') || 'test' === app.get('env')) {
        app.use(errorHandler());
    } else {
        app.use(
          function (err, req, res, next) {
              var code = 500;
              var msg = { message: "Internal Server Error" };

              switch (err.name) {
                  case "UnauthorizedError":
                      code = err.status;
                      msg = undefined;
                      break;
                  case "BadRequestError":
                  case "UnauthorizedAccessError":
                  case "NotFoundError":
                      code = err.status;
                      msg = err.inner;
                      break;
                  default:
                      break;
              }

              return res.status(code).json(msg);

          }
        );
    }
}

function renderRoot(req, res) {
    res.sendFile(path.join(app.get('appPath'), 'index.html'));
}