'use strict';

let fs = require('fs');
let path = require('path');
let del = require('del');
let gulp = require('gulp');
let plugin = {
  sass: require('gulp-sass'),
  foreach: require('gulp-foreach'),
  swig: require('gulp-swig'),
  extReplace: require('gulp-ext-replace'),
  autoprefixer: require('gulp-autoprefixer'),
  inlineCss: require('gulp-inline-css'),
  rename: require('gulp-rename'),
  htmlmin: require('gulp-htmlmin'),
  data: require('gulp-data')
};

let util = require('gulp-util');
let log = util.log;

let browserSync = require('browser-sync').create();
let through = require('through2');

let swig = require('swig');
let swigOptions = {
  varControls: ['<{', '}>'],
  tagControls: ['<%', '%>'],
  cmtControls: ['<#', '#>']
};
swig.setDefaults(swigOptions);

let autoprefixerOptions = {
  browsers: [
    'last 2 version',
    'safari 5',
    'ie 8', 'ie 9',
    'opera 12.1',
    'ios 6',
    'android 4'
  ],
  cascade: false
};

let paths = require('./path-resolve').email;
let modules = require('../config/cc-dev/defaults/modules');
let info = require('../config/cc-dev/public');

let tempHtmlPath = path.join(paths.temp, 'html');
let tempTextPath = path.join(paths.temp, 'text');
let finalHtml = path.join(tempHtmlPath, '*.inline.html');

function renameAsset() {
  return plugin.rename(function (file) {
    //log(file.dirname);
    let parts = file.dirname.split(path.sep);
    parts.splice(0, 4); // remove 4 parts: src/*/server/email
    file.dirname = parts.join(path.sep);
    //log(file.dirname);
  });
}

gulp.task('email-clean', function (callback) {
  return del([paths.temp], callback);
});

gulp.task('email-sass', function () {
  return gulp.src(paths.sass, {base: 'src/*/server/email/html'})
    .pipe(plugin.sass())
    .pipe(plugin.autoprefixer(autoprefixerOptions))
    .pipe(renameAsset())
    .pipe(gulp.dest(tempHtmlPath));
});

gulp.task('email-css', function () {
  return gulp.src(paths.css)
    .pipe(plugin.autoprefixer(autoprefixerOptions))
    .pipe(renameAsset())
    .pipe(gulp.dest(tempHtmlPath));
});

// merged email index
let index;

gulp.task('email-index-build', function () {
  index = {};
  return gulp.src([
      'src/{',
      modules.join(','),
      '}/server/email/index.js'].join(''),
    {read: false})
    .pipe(indexBuilder());

  function indexBuilder() {
    return through.obj(transform, flush);

    function transform(file, enc, callback) {
      log(file.path);
      let emails = require(file.path);
      delete require.cache[require.resolve(file.path)];
      Object.keys(emails).forEach(function (key) {
        log(key);
        let email = emails[key];
        let parent = index[key];
        if (parent) {
          if (email.subject) {
            parent.subject = email.subject;
          }
          if (email.html) {
            parent.html = getHtmlPath(email.html);
          }
          if (email.text) {
            parent.text = getTextPath(email.text);
          }
        } else {
          index[key] = {
            subject: email.subject,
            text: getTextPath(email.text),
            html: getHtmlPath(email.html)
          };
        }

        function getTextPath(name) {
          return path.join(path.dirname(file.path), 'text', name + '.txt');
        }

        function getHtmlPath(name) {
          return path.join(tempHtmlPath, name + '.html');
        }
      });
      callback();
    }

    function flush(callback) {
      //log('flush');

      // render subject text
      Object.keys(index).forEach(function (key) {
        index[key].subject =
          swig.render(index[key].subject,
            info);
      });

      callback();
    }
  }
});

gulp.task('email-html', function () {
  return gulp.src(paths.html)
    .pipe(renameAsset())
    .pipe(gulp.dest(tempHtmlPath));
});

gulp.task('email-text', ['email-index-build'], function () {
  return gulp.src(Object.keys(index).map(function (key) {
    let mail = index[key];
    let text = mail.text;
    mail.text = path.join(tempTextPath, path.basename(text));
    return text;
  }))
    .pipe(plugin.data(info))
    .pipe(plugin.swig(swigOptions))
    .pipe(plugin.extReplace('.txt'))
    .pipe(gulp.dest(tempTextPath));
});

gulp.task('email-html-inline',
  ['email-html', 'email-css', 'email-sass'],
  function () {
    return gulp.src(Object.keys(index).map(function (key) {
      let mail = index[key];
      let html = mail.html;
      mail.html = changeExtension(html, '.inline.html');
      return html;
    }))
      .pipe(plugin.data(info))
      .pipe(plugin.swig(swigOptions))
      .pipe(plugin.inlineCss())
      .pipe(plugin.htmlmin({
        collapseWhitespace: true,
        minifyCSS: true
      }))
      .pipe(plugin.extReplace('.inline.html'))
      .pipe(gulp.dest(tempHtmlPath));
  });

gulp.task('email-index', ['email-html-inline', 'email-text'], function (callback) {
  Object.keys(index).forEach(function (key) {
    let mail = index[key];
    mail.html = fs.readFileSync(mail.html, 'utf8');
    mail.text = fs.readFileSync(mail.text, 'utf8');
  });
  let jsonFileName = 'email.json';
  let indexPath = path.join(__dirname, '../', paths.public, jsonFileName);
  ensureDirectoryExistence(indexPath);
  fs.writeFile(
    path.join(__dirname, '../', paths.public, jsonFileName),
    JSON.stringify(index, null, '\t'),
    'utf8',
    callback
  );
});

gulp.task('email-build', [
  'email-index'
]);

gulp.task('email-dev', [
  'email-build',
  'email-browser-sync',
  'email-watch'
]);

gulp.task('email', [
  'email-build'
]);

gulp.task('email-watch', ['email-build'], function () {
  let everything = Array.prototype.concat.call(
    paths.js, paths.html, paths.text,
    paths.css, paths.sass);
  //log(everything);
  gulp.watch(everything, ['email-build']);
});

gulp.task('email-browser-sync', ['email-build'], function () {
  // log(finalHtml);
  browserSync.init({
    server: {
      baseDir: tempHtmlPath,
      directory: true
    },
    files: finalHtml
  });
});

function changeExtension(file, ext) {
  let lastDotPosition = file.lastIndexOf('.');
  if (lastDotPosition === -1) return file;
  return file.substr(0, lastDotPosition) + ext;
}

function ensureDirectoryExistence(filePath) {
  let dirname = path.dirname(filePath);
  if (directoryExists(dirname)) {
    return true;
  }
  ensureDirectoryExistence(dirname);
  fs.mkdirSync(dirname);
}

function directoryExists(path) {
  try {
    return fs.statSync(path).isDirectory();
  }
  catch (err) {
    return false;
  }
}
