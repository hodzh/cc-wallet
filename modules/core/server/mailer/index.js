module.exports = function(config){
  var mailer = require('./mailer')(config);
  return {
    send: mailer.send.bind(mailer)
  }
};
