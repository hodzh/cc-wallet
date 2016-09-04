'use strict';

var fs = require('fs');
var path = require('path');
var glob = require('glob');
var gulp = require('gulp');
var del = require('del');
var webpack = require('webpack');
var webpackOptions = require('../webpack.config');
var livereload = require('gulp-livereload');
var sort = require('sort-stream');

var util = require('gulp-util');
var log = util.log;
var colors = util.colors;

var plugin = {
  //less: require('gulp-less'),
  //sass: require('gulp-sass'),
  foreach: require('gulp-foreach'),
  spritesmith: require('gulp.spritesmith'),
  imagemin: require('gulp-imagemin'),
  //autoprefixer: require('gulp-autoprefixer'),
  //typescript: require('gulp-typescript'),
  //sourcemaps: require('gulp-sourcemaps'),
  //concat: require('gulp-concat'),
  rename: require('gulp-rename'),
  inject: require('gulp-inject')
};

var pngquant = require('imagemin-pngquant');

var paths = require('./path-resolve');
var pathSort = require('./path-sort');
var cssTempPath = path.join(paths.client.temp, 'css');
var cssPublicPath = path.join(paths.client.public, 'css');
var fontsPublicPath = path.join(paths.client.public, 'fonts');

gulp.task('client-build', [
  'compile',
  'bootstrap',
  'bootstrap-fonts',
  'sounds',
  'favicon',
  'html',
  'images',
  'sprites'
]);

gulp.task('client-clean', function (callback) {
  return del([paths.client.public, paths.client.temp], callback);
});

gulp.task('tsconfig', function (callback) {
  var tsconfigPath = path.join(paths.client.public, '../tsconfig.json');
  fs.readFile(tsconfigPath, function (err, text) {
    if (err) {
      return callback(err);
    }
    var tsconfig = JSON.parse(text);
    tsconfig.files = paths.ts.reduce(function(prev, ts) {
      log(ts);
      return prev.concat(glob.sync(ts));
    }, []);
    fs.writeFile(tsconfigPath,
      JSON.stringify(tsconfig, null, 2), callback);
  });
});

function injectBoot() {
  var dest = path.dirname(paths.client.indexTs);
  return gulp.src(paths.client.indexTs)
    .pipe(plugin.inject(
      gulp.src(paths.client.boot, {read: false})
        .pipe(sort(pathSort))
      , {
        starttag: '// inject boot',
        endtag: '// end inject',
        transform: function (filepath) {
          var importPath = '../../..' + filepath;
          return ['import \'', importPath, '\';'].join('');
        }
      }))
    .pipe(gulp.dest(dest));
}

gulp.task('inject-boot', injectBoot);

gulp.task('compile', ['inject-boot'], function (callback) {
  var compiler = webpack(webpackOptions);
  compiler.run(function (err, stats) {
    if (err) {
      log(err);
      return callback(err);
    }
    callback(null, stats);
  });
});

gulp.task('bootstrap', function () {
  return gulp.src([
    'node_modules/bootstrap/dist/css/bootstrap.min.css',
    'node_modules/bootstrap/dist/css/bootstrap.min.css.map'])
    .pipe(gulp.dest(cssPublicPath));
});

gulp.task('bootstrap-fonts', function () {
  return gulp.src([
    'node_modules/bootstrap/fonts/*.*'])
    .pipe(gulp.dest(fontsPublicPath));
});

gulp.task('html', function () {
  return gulp.src('src/core/client/index.html')
    .pipe(gulp.dest(paths.client.public));
});

gulp.task('sprites', function () {
  return gulp.src(paths.client.sprites, {read: false})
    .pipe(plugin.foreach(
      function (stream, file) {
        var settings = require(file.path);
        var dir = path.dirname(file.path);
        log(file.path);
        return gulp.src(path.join(dir, settings.src))
          .pipe(plugin.spritesmith(settings.options))
          //.pipe(gulp.dest(path.join(paths.client.public, 'images')));
          .pipe(gulp.dest('./'));
      }
    ));
});

gulp.task('images', function () {
  return gulp.src(paths.client.images)
    .pipe(plugin.imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()],
      interlaced: true
    }))
    .pipe(renameAsset())
    .pipe(gulp.dest(path.join(paths.client.public, 'images')));
});

gulp.task('sounds', function () {
  //log(paths.client.sounds);
  return gulp.src(paths.client.sounds)
    .pipe(renameAsset())
    .pipe(gulp.dest(path.join(paths.client.public, 'sounds')));
});

gulp.task('fonts', function () {
  return gulp.src(paths.client.fonts)
    .pipe(renameAsset())
    .pipe(gulp.dest(path.join(paths.client.public, 'fonts')));
});

gulp.task('favicon', function () {
  return gulp.src(paths.client.favicon)
    .pipe(gulp.dest(paths.client.public));
});

/*
 gulp.task('client-watch', ['client-build'], function () {
 var compiler = webpack(webpackOptions);
 compiler.watch({
 aggregateTimeout: 300,
 poll: true
 }, function(err, stats) {
 if (err) {
 log(err);
 return;
 }
 log(stats.toString());
 });
 });*/

gulp.task('watch', ['client-build'], function () {
  livereload.listen({interval: 500});
  gulp.watch(path.join(paths.client.public, '**/*'))
    .on('change', livereload.changed);

  gulp.watch(paths.client.boot, function (event) {
    if (event.type === 'changed') {
      return;
    }
    //return injectBoot();
    gulp.run('inject-boot');
  });

  //gulp.watch(paths.client.favicon, ['faviconCopy']).on('change', plugins.livereload.changed);
  //gulp.watch(paths.client.html, ['htmlCopy']).on('change', plugins.livereload.changed);

  gulp.watch(paths.client.images, ['images']);

  const config = Object.create(webpackOptions);
  config.watch = true;
  //config.cache = true;
  config.debug = true;
  config.bail = false;
  //config.entry.app.push('webpack/hot/dev-server');
  //config.entry.app.unshift("webpack-dev-server/client?http://localhost:7002/");
  //config.plugins.push(new webpack.HotModuleReplacementPlugin());

  webpack(config, function (error, stats) {
    if (error) {
      log('[webpack]', error);
      return;
    }
    showWebpackSummary(stats);
  });

  var WebpackDevServer = require("webpack-dev-server");

  var devServerConfig = {
    port: 7077,
    contentBase: path.join(__dirname, '../', paths.client.public),
    historyApiFallback: false,
    hot: true,
    headers: {"X-Custom-Header": "yes"},

    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    },

    // none (or false), errors-only, minimal, normal (or true) and verbose
    stats: 'minimal',
    //stats: { colors: true },

    proxy: {
      "*": "http://localhost:7002"
    },

    /*proxy: {
     '/api/*': {
     target: 'http://localhost:7002',
     secure: false
     },
     '/aapi/*': {
     target: 'http://localhost:7002',
     secure: false
     },
     '/auth/*': {
     target: 'http://localhost:7002',
     secure: false
     }
     }*/
  };

  //var compiler = webpack(config);
  //var server = new WebpackDevServer(compiler, devServerConfig);
  //server.listen(7077);
});

gulp.task('server-modules', function () {
  var modules = require('../config').modules;
  var code = modules.map(function(mod){
      return 'import * as ' + mod + ' from "./' +
        path.join('modules', mod, 'server/index')
          .replace(/\\/g, '/') + '";';
    }).join('\n') +
    '\nexport const MODULES = [\n' + modules.join(',\n') + '\n];';

  fs.writeFileSync(
    path.join(__dirname, '../modules.ts'),
    code);
});

function showWebpackSummary(stats) {
  log('[webpack]', stats.toString({
    colors: colors.supportsColor,
    hash: false,
    timings: false,
    chunks: false,
    chunkModules: false,
    modules: false,
    children: true,
    version: true,
    cached: false,
    cachedAssets: false,
    reasons: false,
    source: false,
    errorDetails: false
  }));
}

function errorHandler(asset, err) {
  log(colors.red.bold(asset + ' error'));
  log(colors.bgRed('file: ') + err.filename);
  log(colors.bgRed('line: ') + err.lineNumber);
  log(colors.bgRed('extract: ') + err.extract.join(' '));
}

function renameAsset() {
  return plugin.rename(function (file) {
    //log(file.dirname);
    var parts = file.dirname.split(path.sep);
    parts.splice(0, 4); // remove 4 parts: src/*/server/email
    file.dirname = parts.join(path.sep);
    //log(file.dirname);
  });
}
