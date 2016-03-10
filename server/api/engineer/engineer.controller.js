
var mongoose = require('mongoose');
var Engineer = require('./engineer.model.js');


function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}


function index(req, res) {
    Engineer.findAsync()
    .then(respondWithResult(res))
    .catch(handleError(res));

}

function create(req, res) {
    Engineer.createAsync(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}


module.exports = {
    index: index,
    create: create
}
