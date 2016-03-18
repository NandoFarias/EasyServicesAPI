'use strict';

var express = require('express');
var passport = require('passport');
var authService = require('../auth.service');

var router = express.Router();

router
    .get('/', passport.authenticate('google',{
        failureRedirect: '/signup',
        scope: [
            'profile',
            'email'
        ],
        session: false
    }), authService.setTokenCookie)
    .get('/callback',function(req,res) {
        failureRedirect: '/signup',
        session: false
     }), authService.setTokenCookie);

module.exports = router;
