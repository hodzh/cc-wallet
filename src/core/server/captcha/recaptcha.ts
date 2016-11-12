var Promise = require('bluebird');
var Recaptcha = require('recaptcha2');
var config = require('../../../../config');

export class RecaptchaService {

  static verify(req) {
    let res = req.body.captcha;
    let ip = req.connection.remoteAddress;
    let recaptcha = new Recaptcha({
      siteKey: config.recaptcha.public,
      secretKey: config.recaptcha.private
    });

    return recaptcha.validate(res, ip)
                    .then((result) => {
                      if (!result) {
                        throw new Error('Captcha required');
                      }
                    });
  }
}
