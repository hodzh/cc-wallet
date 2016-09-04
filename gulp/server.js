'use strict';

var path = require('path');
var gulp = require('gulp');
var through = require('through');
var gutil = require('gulp-util');
var log = gutil.log;
var colors = gutil.colors;

var plugin = {
  nodemon: require('gulp-nodemon')
};

var paths = require('./path-resolve').server;

gulp.task('server-start', ['env:development'], function () {

  plugins.nodemon({
    script: 'start.js',
    ext: 'html js',
    env: {
      'NODE_ENV': 'development'
    },
    ignore: [
      'bower_components/',
      'client',
      'e2e/',
      'gulp/',
      'modules/*/client/',
      'node_modules/',
      'public/',
      'temp/',
      'tests/',
      '.bower-*',
      '.coverdata/',
      'karma.conf.js'
    ],
    nodeArgs: ['--debug'],
    stdout: false
  })
    .on('readable', function () {
      this.stdout.pipe(process.stdout);
      this.stderr.pipe(process.stderr);
    });
});

gulp.task('prodServe', ['env:production'], function () {
  plugins.nodemon({
    script: 'server.js',
    ext: 'html js',
    env: {'NODE_ENV': 'production'},
    ignore: ['./node_modules/**']
  });
});

gulp.task('env:development', function () {
  process.env.NODE_ENV = 'development';
});

gulp.task('env:production', function () {
  process.env.NODE_ENV = 'production';
});
