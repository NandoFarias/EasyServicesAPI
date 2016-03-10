//Dependencies
var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema   = mongoose.Schema;

//Schema
var EngineerSchema = new Schema({
    username: {type: String, required: true},
    skill: {type: String, required: true},
    location: {type: [Number], required: true}, // [Long, Lat]
    htmlverified: String,
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now}
});

EngineerSchema.pre('save', function(next) {
	now = new Date();
    this.updated_at = now;
    if(!this.created_at){
    	this.created_at = now;
    }
    next();
});


EngineerSchema.index({location: '2dsphere'});

module.exports = mongoose.model('engineer', EngineerSchema);
