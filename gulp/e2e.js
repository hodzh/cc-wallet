var gulp = require('gulp');
var path = require('path');
var request = require('request');
var shell = require('shelljs');

gulp.task('e2e.test', ['e2e.startServer', 'e2e.stopServer'], function(done){});

gulp.task('e2e.update', function(done){
  //Install/update webdriver requirements for Protractor e2e testing
  console.log("Protractor webdriver-manager update");
  var webdriverBin = path.join(require.resolve('protractor'), '../..', 'bin/webdriver-manager').normalize();
  shell.exec('node ' + webdriverBin + ' update', function (code, output) {
    console.log(output);
    if(code != 0)
    {
      process.exit(code);
    }

    done();
  });
});

var server = require('../server');

gulp.task('e2e.startServer', ['e2e.update'], function(done){
  var config = require('../config');
  config.setEnv('development');
  server.start(config, onStart);
  function onStart(err) {
    done(err);
  }
});

gulp.task('e2e.runProtractor', ['e2e.startServer'], function(done){
  shell.exec("node node_modules/protractor/bin/protractor protractor.conf.js", function(code, output){
    done();
  });
});

gulp.task('e2e.stopServer', ['e2e.runProtractor'], function(){
  // todo stop server
  process.exit();
});
