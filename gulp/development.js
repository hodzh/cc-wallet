'use strict';

var path = require('path');
var gulp = require('gulp');
var gulpLoadPlugins = require('gulp-load-plugins');
var through = require('through');
var gutil = require('gulp-util');
var paths = require('./path-settings');
var config = require('../config');

var plugins = gulpLoadPlugins();

var defaultTasks = [
  'clean',
  'constants',
  'sprites',
  'less',
  'sass',
  //'csslint',
  'cssConcat',
  'injectIndex',
  'injectKarma',
  'assetsCopy',
  'soundsCopy',
  'faviconCopy',
  'htmlCopy',
  'jsCopy',
  'devServe',
  'watch'
];

function resolveModules(paths, modules) {
  //return;
  Object.keys(paths).forEach(function (key) {
    var val = paths[key];
    if (Array.isArray(val)) {
      for (var i = 0; i < val.length; ++i) {
        var path = val[i];
        var searchString = 'modules/*/';
        if (path.indexOf(searchString) === 0) {
          val[i] = ['modules/{',
            modules.join(),
            '}/',
            path.substr(searchString.length)].join('');
        }
      }
    }
  });
}

resolveModules(paths, config.modules);

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
  return gulp.src(paths.jsShared, {read: false})
    .pipe(plugins.foreach(
      function(stream, file){
        return gulp.src(file.path, {read: false})
          .pipe(plugins.ngConstant({
            name: 'walleApp.constants',
            deps: false,
            constants: require(file.path),
            wrap: true
          }))
          .pipe(plugins.extReplace('.js', '.public.js'))
          .pipe(gulp.dest(path.join(paths.publicRoot, 'modules/core/client/app/constants')));
      }
    ));
  // Writes config.js to dist/ folder
  //.pipe(gulp.dest(path.join(paths.publicRoot,'constants')));
});

gulp.task('sprites', function() {
  return gulp.src(paths.sprites, {read: false})
    .pipe(plugins.foreach(
      function(stream, file){
        var settings = require(file.path);
        var dir = path.dirname(file.path);
        var destDir = dir;
        while(path.basename(destDir) !== 'client') {
          destDir = path.dirname(destDir);
        }
        destDir = path.join(destDir, 'assets/sprites');
        // console.log(destDir);
        return gulp.src(path.join(dir, settings.src))
          .pipe(plugins.spritesmith(settings.options))
          .pipe(gulp.dest(destDir));
      }
    ));
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
  return gulp.src('modules/core/client/app/app.scss')
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
    .pipe(gulp.dest('modules/core/client/app'));
});

gulp.task('cssConcat', function() {
  return gulp.src(paths.css)
    .pipe(plugins.concat('app.css'))
    .pipe(gulp.dest(path.join(paths.publicRoot, 'css')));
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
    .pipe(gulp.dest(paths.publicRoot));
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
    .pipe(plugins.inject(
      gulp.src(
        paths.injectDev, {read: true})
        .pipe(plugins.naturalSort()),
      {
        starttag: '// inject-dev:js',
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
    .pipe(gulp.dest(path.join(paths.publicRoot, 'modules')));
});

gulp.task('soundsCopy', function() {
  return gulp.src(paths.sounds)
    .pipe(gulp.dest(path.join(paths.publicRoot, 'modules')));
});

gulp.task('htmlCopy', function() {
  return gulp.src(paths.html)
    .pipe(gulp.dest(path.join(paths.publicRoot, 'modules')));
});

gulp.task('jsCopy', function() {
  return gulp.src(paths.jsClient)
    .pipe(gulp.dest(path.join(paths.publicRoot, 'modules')));
});

gulp.task('faviconCopy', function() {
  return gulp.src(paths.favicon)
    .pipe(gulp.dest(paths.publicRoot));
});

gulp.task('devServe', ['env:development'], function () {

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
    .on('readable', function() {
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
  plugins.livereload.listen({interval:500});

  //gulp.watch(paths.js, ['jshint']);
  //gulp.watch(paths.css, ['csslint']).on('change', plugins.livereload.changed);
  gulp.watch(paths.css, ['cssConcat']).on('change', plugins.livereload.changed);
  gulp.watch(paths.less, ['less', 'cssConcat']).on('change', plugins.livereload.changed);
  gulp.watch(paths.sass, ['sass', 'cssConcat']).on('change', plugins.livereload.changed);
  gulp.watch(paths.assets, ['assetsCopy']).on('change', plugins.livereload.changed);
  gulp.watch(paths.favicon, ['faviconCopy']).on('change', plugins.livereload.changed);
  gulp.watch(paths.index, ['injectIndex']).on('change', plugins.livereload.changed);
  gulp.watch(paths.injectJs, ['injectIndex', 'injectKarma']).on('change', plugins.livereload.changed);
  gulp.watch(paths.html, ['htmlCopy']).on('change', plugins.livereload.changed);
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
