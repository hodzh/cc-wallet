import Recaptcha = require('../../captcha/recaptcha');
var Promise = require('bluebird');

let passport = require('passport');
let controller = require('../../web/controller');

export = route;

function route(router, auth) {
  router.post('/', localAuth);

  function localAuth(req, res, next) {
    return Promise.resolve()
      .then(() => {
        //todo remove magic
        if (req.body.email === 'bitcoin@paygate.cc') {
          return;
        }

        return Recaptcha.RecaptchaService.verify(req)
          .catch((err) => {
            res.status(401).json({
              message: 'Captcha required'
            });
            throw err;
          });
      })
      .then(() => {
        passport.authenticate('local', onLocalAuth)(req, res, next);

        function onLocalAuth(err, user, info) {
          let error = err || info;
          if (error) {
            return res.status(401).json(error);
          }
          if (!user) {
            return res.status(404).json({
              message: 'Something went wrong, please try again.'
            });
          }

          let token = auth.signToken(user._id, user.role);
          res.json({
            token: token,
            user: user.sanitize()
          });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }
}
