'use strict';

var express = require('express');
var config = require('../config/environment');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
var compose = require('composable-middleware');
var User = require('../api/user/user.model');

var validateJwt = expressJwt({
    secret: config.secrets.session
});


function isAuthenticated() {
  return compose()
    // Validate jwt
    .use(function(req, res, next) {
      // allow access_token to be passed through query parameter as well
      if (req.query && req.query.hasOwnProperty('access_token')) {
        req.headers.authorization = 'Bearer ' + req.query.access_token;
      }
      validateJwt(req, res, next);
    })
    // Attach user to request
    .use(function(req, res, next) {

      User.findById(req.user._id)
        .then(function(user) {
            if (!user) {
                return res.status(401).end();
            }
            req.user = user;
            next();
        })
        .catch(function(err) {
            next(err);
        });

    });
}

function hasRole(roleRequired) {
  if (!roleRequired) {
    throw new Error('Required role needs to be set');
  }

  return compose()
    .use(isAuthenticated())
    .use(function meetsRequirements(req, res, next) {
      if (config.userRoles.indexOf(req.user.role) >=
          config.userRoles.indexOf(roleRequired)) {
        next();
      } else {
        res.status(403).send('Forbidden');
      }
    });
}

function signToken(id, role) {
  return jwt.sign({ _id: id, role: role }, config.secrets.session, {
    expiresIn: 60 * 60 * 5
  });
}

function setTokenCookie(req, res) {
    if(!req.user){
        return res.status(404).send("Me parece que você não está logado, por favor tente novamente");
    }

    var token = signToken(req.user._id, req.user.role);
    res.cookie('token', token);
    res.redirect('/');
}


module.exports = {
    isAuthenticated: isAuthenticated,
    hasRole: hasRole,
    signToken: signToken,
    setTokenCookie: setTokenCookie
}
