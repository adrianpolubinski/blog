var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var newsSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required:true},
    date: {type: Date, default: Date.now}
});

module.exports = mongoose.model('News', newsSchema);
