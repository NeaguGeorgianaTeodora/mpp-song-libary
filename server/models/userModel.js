const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    Username: { type: String, required: true },
    Password: { type: String, required: true },
    RefreshToken: { type: String }
});

module.exports = mongoose.model('userList', userSchema);