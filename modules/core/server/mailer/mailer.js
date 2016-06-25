var Promise = require('bluebird');
var mailer = require('nodemailer');
var log = require('log4js').getLogger('email');
var mails = require('../../../../public-email');

module.exports = function(config){
  var transport = mailer.createTransport('SMTP', config.mailer);

  return {
    send: send
  };

  function send(options, key, context) {
    var mail = mails[key];
    var sender = transport.templateSender(mail, {
      from: options.from
    });
    return Promise.fromNode(sender.bind(null, options, context));
  }
};