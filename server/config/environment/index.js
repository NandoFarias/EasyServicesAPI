'use strict';

var path = require('path');
var _ = require('lodash');


var all = {
  env: process.env.NODE_ENV,

  // Root path of server
  root: path.normalize(__dirname + '/../../..'),

  // Server port
  port: process.env.PORT || 3000,

  // Server IP
  ip: process.env.IP || '0.0.0.0'

}

module.exports = _.merge(
  all,
  require('./' + process.env.NODE_ENV + '.js') || {});
