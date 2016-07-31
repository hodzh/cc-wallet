var modules = require('../config').modules;
var util = require('gulp-util');
var log = util.log;
module.exports = function(a, b) {
  var i = modules.indexOf(getModule(a));
  var j = modules.indexOf(getModule(b));
  return i - j;
};

function getModule(file) {
  var filepath = file.path;
  var match = filepath.match(/.*[\/\\]modules[\/\\]([^\/\\]*)[\/\\].*/);
  //log(match[1]);
  return match[1];
}
