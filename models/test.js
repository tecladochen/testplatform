const mongoose = require('mongoose');
const path = require('path');

const Schema = mongoose.Schema;

const TopicSchema = new Schema({
    question: { type: String },
    selectA: { type: String },
    selectB: { type: String },
    selectC: { type: String },
    selectD: { type: String },
    answer: { type: String },
    analyze: { type: String }
});

const TestSchema = new Schema({
    title: { type: String },
    text: { type: String },
    content: { type: [TopicSchema] },
});

module.exports = mongoose.model('Test', TestSchema);