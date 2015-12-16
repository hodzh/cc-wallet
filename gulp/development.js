'use strict';

var path = require('path');
var gulp = require('gulp');
var gulpLoadPlugins = require('gulp-load-plugins');
var through = require('through');
var gutil = require('gulp-util');
var plugins = gulpLoadPlugins();

var paths = {
  js: [
    './*.js',
    'config/**/*.js',
    'gulp/**/*.js',
    'tools/**/*.js',
    'server/**/*.js',
    '!.*/**',
    '!tests/**',
    '!node_modules/**',
    '!bower_modules/**',
    '!public/**'],

  json: [
    './*.json',
    'config/**/*.json',
    'gulp/**/*.json',
    'tools/**/*.json',
    'server/**/*.json',
    '!.*/**',
    '!tests/**',
    '!node_modules/**',
    '!bower_modules/**',
    '!public/**'],

  injectJs: [
    'client/{app,components}/**/!(*.spec|*.mock).js'],
  css: [
    'client/{app,components}/**/*.css'],
  html: [
    'client/{app,components}/**/*.html'],
  less: [
    'client/{app,components}/**/*.less'],
  sass: [
    'client/{app,components}/**/*.scss',
    '!client/app/app.scss'],
  assets: 'client/assets/**/*.{css,png,jpg}',
  favicon: 'client/favicon.ico',
  index:'client/index.html',
  karmaConf:'karma.conf.js'
};

var config = require('../config');
var dest = 'public';

var defaultTasks = ['clean', 'constants', 'less', 'sass', 'csslint', 'injectIndex', 'assetsCopy', 'faviconCopy', 'htmlCopy', 'devServe', 'watch'];

gulp.task('env:development', function () {
  process.env.NODE_ENV = 'development';
});

gulp.task('jsFormat', function() {
  return gulp.src(paths.js, paths.json)
    .pipe(plugins.jsbeautifier({
      config: '.jsbeautifyrc',
      mode: 'VERIFY_AND_WRITE'
    }))
    .pipe(gulp.dest(function (vinyl) {
      return vinyl.cwd;
    }));
});

gulp.task('constants', function () {
  return gulp.src('')
    .pipe(plugins.ngConstant({
      name: 'walleApp.constants',
      deps: [],
      constants: config.shared,
      wrap: ''
    }))
    .pipe(gulp.dest('client/app/constants'));
  // Writes config.js to dist/ folder
  //.pipe(gulp.dest(path.join(dest,'constants')));
});

gulp.task('jshint', function () {
  return gulp.src(paths.js)
    .pipe(plugins.jshint())
    .pipe(plugins.jshint.reporter('jshint-stylish'))
    // .pipe(plugins.jshint.reporter('fail')) to avoid shutdown gulp by warnings
    .pipe(count('jshint', 'files lint free'));
});

gulp.task('csslint', function () {
  return gulp.src(paths.css)
    .pipe(plugins.csslint('.csslintrc'))
    .pipe(plugins.csslint.reporter())
    .pipe(count('csslint', 'files lint free'));
});

gulp.task('less', function() {
  return gulp.src(paths.less)
    .pipe(plugins.less())
    .pipe(gulp.dest(function (vinylFile) {
      return vinylFile.cwd;
    }));
});

gulp.task('sass', function() {
  gulp.src('client/app/app.scss')
    .pipe(plugins.inject(
      gulp.src(paths.sass, {read: false}),
      {
        starttag: '// injector',
        endtag: '// endinjector',
        transform: function (filePath, file) {
          return ['@import \'.', filePath, '\';'].join('');
        }
      }))
    .pipe(plugins.sass())
    .pipe(gulp.dest(dest + '/css/'));
});

gulp.task('injectIndex', function() {
  return gulp.src(paths.index)
    .pipe(plugins.inject(
      gulp.src(paths.injectJs, {read: true})
        .pipe(plugins.naturalSort())
        .pipe(plugins.angularFilesort()),
      {
        name: 'injector',
        transform: function (filePath, file) {
          return ['<script src="', filePath, '"></script>'].join('');
        }
      }
    ))
    .pipe(plugins.inject(
      gulp.src(
        config.getAssets('js'), {read: false}),
      {
        name: 'bower',
        transform: function (filePath, file) {
          return ['<script src="', filePath, '"></script>'].join('');
        }
      }
    ))
    .pipe(plugins.inject(
      gulp.src(
        config.getAssets('css'), {read: false}),
      {
        name: 'bower',
        transform: function (filePath, file) {
          return ['<link rel="stylesheet" href="', filePath, '">'].join('');
        }
      }
    ))
    .pipe(plugins.inject(
      gulp.src(
        config.getAssets('js'), {read: false}),
      {
        name: 'bower',
        transform: function (filePath, file) {
          return ['<script src="', filePath, '"></script>'].join('');
        }
      }
    ))
    .pipe(gulp.dest(dest));
});

gulp.task('injectKarma', function() {
  return gulp.src(paths.karmaConf)
    .pipe(plugins.inject(
      gulp.src(config.getAssets('js'), {read: true}),
      {
        starttag: '// bower:js',
        endtag: '// endinject',
        transform: function (filePath, file) {
          return '\'.' + filePath + '\','
        }
      }
    ))
    .pipe(plugins.inject(
      gulp.src(
        paths.injectJs, {read: true})
        .pipe(plugins.naturalSort())
        .pipe(plugins.angularFilesort()),
      {
        starttag: '// inject:js',
        endtag: '// endinject',
        transform: function (filePath, file) {
          return '\'.' + filePath + '\','
        }
      }
    ))
    .pipe(gulp.dest(function (vinyl) {
      return vinyl.cwd;
    }));
});

gulp.task('assetsCopy', function() {
  return gulp.src(paths.assets)
    .pipe(gulp.dest(path.join(dest, 'assets')));
});

gulp.task('htmlCopy', function() {
  return gulp.src(paths.html)
    .pipe(gulp.dest(dest));
});

gulp.task('faviconCopy', function() {
  return gulp.src(paths.favicon)
    .pipe(gulp.dest(dest));
});

gulp.task('devServe', ['env:development'], function () {

  plugins.nodemon({
    script: 'start.js',
    ext: 'html js',
    env: { 'NODE_ENV': 'development' } ,
    ignore: [
      'node_modules/',
      'bower_components/',
      'logs/',
      '.bower-*'
    ],
    nodeArgs: ['--debug'],
    stdout: false
  }).on('readable', function() {
    this.stdout.on('data', function(chunk) {
      if(/Walle server listening/.test(chunk)) {
        setTimeout(function() { plugins.livereload.reload(); }, 500);
      }
      process.stdout.write(chunk);
    });
    this.stderr.pipe(process.stderr);
  });
});

gulp.task('watch', function () {
  //plugins.livereload.listen({interval:500});

  //gulp.watch(paths.js, ['jshint']);
  gulp.watch(paths.css, ['csslint']).on('change', plugins.livereload.changed);
  gulp.watch(paths.less, ['less']);
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.assets, ['assetsCopy']);
  gulp.watch(paths.favicon, ['faviconCopy']);
  gulp.watch(paths.index, ['injectIndex']);
  gulp.watch(paths.injectJs, ['injectIndex']);
  gulp.watch(paths.html, ['htmlCopy']);
});

function count(taskName, message) {
  var fileCount = 0;

  function countFiles(file) {
    fileCount++; // jshint ignore:line
  }

  function endStream() {
    gutil.log(gutil.colors.cyan(taskName + ': ') + fileCount + ' ' + message || 'files processed.');
    this.emit('end'); // jshint ignore:line
  }
  return through(countFiles, endStream);
}

gulp.task('development', defaultTasks);
