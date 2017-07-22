const jwt = require('jsonwebtoken');
const jws = require('jws');
const passport = require('passport');
import Recaptcha = require('../../captcha/recaptcha');
const controller = require('../../web/controller');
const RefreshToken = require('../../model/refresh-token');
const User = require('../../model/user');

export = function(options) {

  return function route(router, auth) {
    router.post('/refresh', refresh);
    router.post('/', localAuth);

    function localAuth(req, res, next) {
      return Promise.resolve()
        .then(() => {
          if (options.delay) {
            return new Promise((resolve, reject) => setTimeout(resolve, options.delay));
          }
        })
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
          return new Promise((resolve, reject) => {
            passport.authenticate('local', onLocalAuth)(req, res, next);

            function onLocalAuth(err, user, info) {
              let error = err || info;
              if (error) {
                res.status(401).json(error);
                return reject(new Error('401'));
              }
              if (!user) {
                res.status(404).json({
                  message: 'Something went wrong, please try again.'
                });
                return reject(new Error('404'));
              }

              resolve(user);
            }
          });
        })
        .then((user: any) => {
          let refreshToken = new RefreshToken();
          refreshToken.user = user._id;
          refreshToken.createToken();
          return Promise.all([user, refreshToken.save()]);
        })
        .then(([user, refreshToken]) => {
          let token = auth.signToken(user._id, user.role);
          res.json({
            token: token,
            user: user.sanitize(),
            refreshToken: refreshToken.token,
          });
        })
        .catch((err) => {
          console.error(err);
        });
    }

    function refresh(req, res, next) {
      return Promise.resolve()
        .then(() => {
          let refreshToken = req.body.refreshToken;
          if (!refreshToken || !refreshToken.length) {
            throw new Error('bad refresh token');
          }
          let authToken;
          if (req.headers && req.headers.authorization) {
            let parts = req.headers.authorization.split(' ');
            if (parts.length === 2) {
              let scheme = parts[0];
              let credentials = parts[1];
              if ('Bearer' === scheme) {
                authToken = credentials;
              }
            }
          }
          if (!authToken || !authToken.length) {
            throw new Error('bad auth token');
          }
          let code = jwt.decode(authToken, {complete: true});
          let valid = jws.verify(authToken, code.header.alg, options.jwt.secret);
          if (!valid) {
            throw new Error('invalid signature');
          }
          return Promise.all([User.findById(code.payload._id), RefreshToken.findOne({
            token: refreshToken,
          })]);
        })
        .then(([user, refreshToken]) => {
          if (!refreshToken || !user || refreshToken.user != user.id) {
            throw new Error('bad refresh token');
          }
          let token = auth.signToken(user._id, user.role);
          res.status(200).json({
            token: token,
          });
          refreshToken.updated = new Date();
          return refreshToken.save();
        })
        .catch((err) => {
          console.error(err);
          res.status(401).json({
            message: err.message
          });
        })
        ;
    }
  };
};
