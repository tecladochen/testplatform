const mongoose = require('mongoose');
const path = require('path');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    password: { type: String },
    email: { type: String },
    text: { type: String }
});

module.exports = mongoose.model('User', UserSchema);