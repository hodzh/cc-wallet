'use strict';

 var express = require('express');
 var passport = require('passport');

 var auth = require('../');

var router = express.Router();

router.post('/', localAuth);

module.exports = router;

function localAuth(req, res, next) {
    passport.authenticate('local', passportLocalAuth)(req, res, next);

    function passportLocalAuth(err, user, info) {
        var error = err || info;
        if (error) {
            return res.status(401).json(error);
        }
        if (!user) {
            return res.status(404).json({
                message: 'Something went wrong, please try again.'
            });
        }

        var token = auth.signToken(user._id, user.role);
        res.json({ token: token });
    }
}
