var fs = require('fs');
var gulp = require('gulp');
var gulpLoadPlugins = require('gulp-load-plugins');
var request = require('request');
var karma = require('karma');
var paths = require('./path-settings');

//var assets = require('../config/production/assets');

var karmaServer = karma.Server;
var plugins = gulpLoadPlugins();

process.env.NODE_ENV = 'test';

gulp.task('test', ['startServer', 'stopServer']);

gulp.task('runMochaCover', function () {
  // todo coverage report
});

gulp.task('runMochaCover1', function () {
  return gulp.src(paths.jsServer)
    .pipe(plugins.coverage.instrument({
      pattern: paths.jsServer
    }))
});

gulp.task('runMochaCover2', function () {
  return gulp.src(paths.jsServer)
    .pipe(plugins.istanbul())
  //.pipe(plugins.istanbul.hookRequire())
});

gulp.task('startServer', ['runMochaCover'], function (done) {
  var server = require('../modules/core/server');
  var config = require('../config');
  config.setEnv('test');
  server.init(config);
  server.start(
    function (err) {
      done();
    });
});

gulp.task('stopServer', ['runKarma'], function () {
  // todo server.stop
  process.exit();
});

gulp.task('runMocha', ['startServer'], function () {
  return gulp.src(paths.jsMocha)
    .pipe(plugins.mocha(
      {
        reporter: 'spec',
        require: [paths.mochaConf],
        timeout: 5000
      }
    ))
    /*
     .pipe(plugins.istanbul.writeReports(
     {
     dir: './tests/server/coverage',
     reporters: [ 'lcov', 'json', 'text', 'text-summary' ],
     reportOpts: { dir: './tests/server/coverage' }
     }
     ))*/
    /*
     .pipe(plugins.coverage.gather())
     .pipe(plugins.coverage.format())
     .pipe(gulp.dest('tests/server/coverage'))
     */
    .on('error', function (error) {
      console.error(error);
      this.emit('end');
    });
});

gulp.task('runKarma', ['runMocha'], function (done) {
  var karma = new karmaServer({
    configFile: __dirname + '/../karma.conf.js',
    singleRun: true,
  }, function () {
    done();
  });

  karma.start();
});
