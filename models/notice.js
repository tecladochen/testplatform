const mongoose = require('mongoose');
const path = require('path');

const Schema = mongoose.Schema;

const NoticeSchema = new Schema({
    email: { type: String },
    accept: { type: String },
    topic: { type: String },
    content: { type: String }
});

module.exports = mongoose.model('Notice', NoticeSchema);