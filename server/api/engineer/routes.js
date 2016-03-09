//Depencencies
var mongoose = require('mongoose');
var Engineer = require('./model.js');

//Routes
module.exports = function(app) {

	//GET
	app.get('/engineers', function(req, res) {
		var query = Engineer.find({});
		query.exec(function(err, engineers) {
			if(err)
				res.send(err);

			res.json(engineers);
		});
	});

	//POST
	app.post('/engineers', function(req, res) {
		var engineer = new Engineer(req.body);

		engineer.save(function(err) {
			if(err)
				res.send(err);
			res.json(engineer);
		});
	});


}