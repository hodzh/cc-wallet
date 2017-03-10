import * as mailer from 'nodemailer';
import * as smtpTransport from 'nodemailer-smtp-transport';
import { callback2promise } from '../polyfills/promisify';
var log = require('log4js').getLogger('email');

export = function (config) {
  var transport = mailer.createTransport(
    smtpTransport(config.mailer));

  return {
    send: send
  };

  function send(options, key, context) {
    log.trace('send email', key);
    var mailsObj = config.template;
    var mail = mailsObj[key];
    if (!mail) {
      log.error('unknown email type', key);
      return Promise.resolve();
    }
    var sender = transport.templateSender(mail, {
      from: options.from
    });
    return callback2promise(sender.bind(null, options, context));
  }
};
