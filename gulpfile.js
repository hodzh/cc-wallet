'use strict';

var gulp = require('gulp');

// load tasks
require('./gulp/build');
require('./gulp/server');
require('./gulp/email');
require('./gulp/test');
require('./gulp/e2e');
require('./gulp/utils');
require('./gulp/dev');

// development is default task
gulp.task('default', ['dev']);