var Promise = require('bluebird');
var mailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var log = require('log4js').getLogger('email');
var mails = require('../../../../public-email');

export = function (config) {
  var transport = mailer.createTransport(
    smtpTransport(config.mailer));

  return {
    send: send
  };

  function send(options, key, context) {
    log.trace('send email', key);
    var mail = mails[key];
    var sender = transport.templateSender(mail, {
      from: options.from
    });
    return Promise.fromNode(sender.bind(null, options, context));
  }
};
