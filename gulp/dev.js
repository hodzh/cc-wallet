'use strict';

var gulp = require('gulp');

gulp.task('dev', [
  'watch'
]);

gulp.task('watch', ['client-build', 'server-start'], function () {

});
