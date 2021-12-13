var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var quizSchema = new mongoose.Schema({
    title: { type: String, required: true },
    vote: { type: Number, required: true, default: 0 }
});

module.exports = mongoose.model('Quiz', quizSchema);
