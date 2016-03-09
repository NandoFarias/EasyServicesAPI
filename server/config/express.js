'use strict';

var express = require('express');
var morgan         = require('morgan');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');

module.exports = function(app) {
    //Logging and parsing
    app.use(express.static(__dirname + '../../client'));
    //app.use('/bower_components',  express.static(__dirname + '/bower_components'));
    app.use(morgan('dev'));                                         // log with Morgan
    app.use(bodyParser.json());                                     // parse application/json
    app.use(bodyParser.urlencoded({extended: true}));               // parse application/x-www-form-urlencoded
    app.use(bodyParser.text());                                     // allows bodyParser to look at raw text
    app.use(bodyParser.json({ type: 'application/vnd.api+json'}));  // parse application/vnd.api+json as json
    app.use(methodOverride());
}
