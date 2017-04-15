import * as mailer from 'nodemailer';
import * as smtpTransport from 'nodemailer-smtp-transport';
var log = require('log4js').getLogger('email');

export = function (config) {
  var transport = mailer.createTransport(
    smtpTransport(config.mailer));

  return {
    send: send
  };

  function send({options, key, context}, callback) {
    log.trace('send email', key);
    var mailsObj = config.template;
    var mail = mailsObj[key];
    if (!mail) {
      log.error('unknown email type', key);
      return callback();
    }
    var sender: any = transport.templateSender(mail, {
      from: options.from
    });
    return sender(options, context, callback);
  }
};
