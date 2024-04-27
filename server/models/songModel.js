const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const songSchema = new Schema({
    Id: { type: String, required: true },
    Title: { type: String, required: true },
    Artist: { type: String, required: true }
});

module.exports = mongoose.model('songList', songSchema);