var fs = require('fs');

var gulp = require('gulp');
var gulpLoadPlugins = require('gulp-load-plugins');
var request = require('request');
var karma = require('karma');
//var _ = require('lodash');

//var assets = require('../config/production/assets');

var karmaServer = karma.Server;
var plugins = gulpLoadPlugins();

process.env.NODE_ENV = 'test';

gulp.task('test', ['startServer', 'stopServer']);

gulp.task('startServer', function(done) {
  var server = require('../server');
  var config = require('../config');
  server.start(
      config,
      function(err){
        done();
      });
});

gulp.task('stopServer', ['runKarma'], function() {
  // todo server.stop
  process.exit();
});

gulp.task('runMocha', ['startServer'], function () {
  return gulp.src(['./server/**/*.spec.js', './server/**/*.integration.js'], {read: false})
      .pipe(plugins.mocha(
          {
            reporter: 'spec',
            require: ['./mocha.conf.js'],
            timeout: 5000
          }
      ))
      .on('error', function(error){
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