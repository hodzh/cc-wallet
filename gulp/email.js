'use strict';

var fs = require('fs');
var path = require('path');
var async = require('async');

var gulp = require('gulp');
var less = require('gulp-less');
var sass = require('gulp-sass');
var foreach = require('gulp-foreach');
var gulpSwig = require('gulp-swig');
var through = require('through2');
var extReplace = require('gulp-ext-replace');
var gulpAutoprefixer = require('gulp-autoprefixer');
var inlineCss = require('gulp-inline-css');
var rename = require('gulp-rename');
var htmlmin = require('gulp-htmlmin');

var autoprefixer = gulpAutoprefixer.bind(null,
  'last 2 version',
  'safari 5',
  'ie 8', 'ie 9',
  'opera 12.1',
  'ios 6',
  'android 4');

var util = require('gulp-util');
var File = util.File;
var log = util.log;

var swig  = require('swig');
var swigOptions = {
  varControls: ['<{', '}>'],
  tagControls: ['<%', '%>'],
  cmtControls: ['<#', '#>']
};
swig.setDefaults(swigOptions);

var paths = require('./path-settings');
var config = require('../config');

var tempHtmpPath = path.join(paths.email.temp, 'html');
var tempTextPath = path.join(paths.email.temp, 'text');

gulp.task('email-less', function() {
  return gulp.src(paths.email.less, {base: 'modules/*/server/email/html'})
    .pipe(less())
    .pipe(autoprefixer())
    .pipe(renameCss())
    .pipe(gulp.dest(tempHtmpPath));
});

gulp.task('email-sass', function() {
  return gulp.src(paths.email.sass, {base: 'modules/*/server/email/html'})
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(renameCss())
    .pipe(gulp.dest(tempHtmpPath));
});

gulp.task('email-css', function() {
  return gulp.src(paths.email.css)
    .pipe(autoprefixer())
    .pipe(renameCss())
    .pipe(gulp.dest(tempHtmpPath));
});

function renameCss() {
  return rename(function (file) {
    //log(file.dirname);
    var parts = file.dirname.split(path.sep);
    parts.splice(0, 4);
    file.dirname = parts.join(path.sep);
    //log(file.dirname);
  });
}

var index = {};

gulp.task('email-index-build', function() {
  return gulp.src([
      'modules/{',
      config.modules.join(','),
      '}/server/email/index.js'].join(''),
    {read: false})
    .pipe(indexBuilder('index.json'));

  function indexBuilder(fileName) {
    return through.obj(transform, flush);

    function transform(file, enc, cb) {
      log(file.path);
      var emails = require(file.path);
      Object.keys(emails).forEach(function (key) {
        log(key);
        var email = emails[key];
        var parent = index[key];
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
          return path.join(path.dirname(file.path), 'html', name + '.html');
        }
      });
      cb();
    }

    function flush(cb) {
      log('flush');
      Object.keys(index).forEach(function (key) {
        return function (cb) {
          index[key].subject =
            swig.render(index[key].subject,
              config.public);
        }
      });
      cb();
    }
  }
});

gulp.task('email-html', ['email-index-build'], function() {
  return gulp.src(Object.keys(index).map(function (key) {
      log(index[key].html);
      return index[key].html;}))
    .pipe(gulpSwig({
      varControls: ['<{', '}>'],
      tagControls: ['<%', '%>'],
      cmtControls: ['<#', '#>'],
      data: config.public
    }))
    .pipe(gulp.dest(tempHtmpPath));
});

gulp.task('email-text', ['email-index-build'], function() {
  return gulp.src(Object.keys(index).map(function (key) {
      log(index[key].text);
      return index[key].text;}))
    .pipe(gulpSwig({
      varControls: ['<{', '}>'],
      tagControls: ['<%', '%>'],
      cmtControls: ['<#', '#>'],
      data: config.public
    }))
    .pipe(extReplace('.txt'))
    .pipe(gulp.dest(tempTextPath));
});

gulp.task('email-html-inline',
  ['email-html', 'email-text', 'email-css', 'email-sass', 'email-less'],
  function() {
    Object.keys(index).forEach(function (key) {
      var mail = index[key];
      mail.html = path.join(tempHtmpPath, path.basename(mail.html));
      mail.text = path.join(tempTextPath, path.basename(mail.text));
    });
    return gulp.src(Object.keys(index).map(function (key) {
        log(index[key].html);
        return index[key].html;
      }))
      .pipe(inlineCss())
      .pipe(htmlmin({
        collapseWhitespace: true,
        minifyCSS: true
      }))
      .pipe(extReplace('.inline.html'))
      .pipe(gulp.dest(tempHtmpPath));
  });

gulp.task('email-index', ['email-html-inline'], function() {
  Object.keys(index).forEach(function (key) {
    var mail = index[key];
    mail.html = fs.readFileSync(changeExtension(mail.html, '.inline.html'), 'utf8');
    mail.text = fs.readFileSync(mail.text, 'utf8');
  });
  fs.writeFileSync(
    path.join(__dirname, '../', paths.email.public, 'index.json'),
    JSON.stringify(index, null, '\t'),
    'utf8'
  );
});

gulp.task('email', [
  //'email-clean',
  'email-index',
]);

function changeExtension(file, ext) {
  var lastDotPosition = file.lastIndexOf('.');
  if (lastDotPosition === -1) return file;
  return file.substr(0, lastDotPosition) + ext;
}