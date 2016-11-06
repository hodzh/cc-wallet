import * as Promise from 'bluebird';
import * as mailer from 'nodemailer';
import * as smtpTransport from 'nodemailer-smtp-transport';
var log = require('log4js').getLogger('email');
var mails = require('../../../../public-email/index.json');
// todo fix json loader
var mailsObj = JSON.parse(mails);

export = function (config) {
  var transport = mailer.createTransport(
    smtpTransport(config.mailer));

  return {
    send: send
  };

  function send(options, key, context) {
    log.trace('send email', key);
    var mail = mailsObj[key];
    if (!mail) {
      log.error('unknown email type', key);
      return Promise.resolve();
    }
    var sender = transport.templateSender(mail, {
      from: options.from
    });
    return Promise.fromNode(sender.bind(null, options, context));
  }
};
