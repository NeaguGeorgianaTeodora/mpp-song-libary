const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const playlistSchema = new Schema({
    Id: { type: String, required: true },
    Name: { type: String, required: true },
    Creator: { type: String, required: true },
    Rating: { type: Number, required: true },
    ImageURL: { type: String, required: false },
    Songs: [{ type: Schema.Types.ObjectId, ref: 'Song'}]
});

module.exports = mongoose.model('PlaylistLibrary', playlistSchema);