const mongoose = require('mongoose');
const path = require('path');

const Schema = mongoose.Schema;

const RecordSchema = new Schema({
    email: { type: String },
    title: { type: String },
    answer: { type: Array },
    score: { type: String },
});

module.exports = mongoose.model('Record', RecordSchema);