
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

function search(req, res) {
    var lat      = req.body.latitude;
    var long     = req.body.longitude;
    var distance = req.body.distance;

    var query = Engineer.find({});

    if(distance){

        // Using MongoDB's geospatial querying features. (Note how coordinates are set [long, lat]
        query = query.where('location').near({ center: {type: 'Point', coordinates: [long, lat]},

            // Converting meters to miles. Specifying spherical geometry (for globe)
            maxDistance: distance, spherical: true});
    }

    query.execAsync()
    .then(respondWithResult(res))
    .catch(handleError(res));
}


module.exports = {
    index: index,
    create: create,
    search: search
}
