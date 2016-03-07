//Dependencies
var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

//Schema
var SearchSchema = new Schema({
    skill: {type: String, required: true},
    location: {type: [Number], required: true}, // [Lat, Long]
    htmlverified: String,
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now}
});

SearchSchema.pre('save', function(next) {
	now = new Date();
    this.updated_at = now;
    if(!this.created_at){
    	this.created_at = now;
    }  
    next();
});


SearchSchema.index({location: '2dsphere'});

module.exports = mongoose.model('search', SearchSchema);