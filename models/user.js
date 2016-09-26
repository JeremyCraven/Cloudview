var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    name: String,
    username: String,
    email: String,
    password: String,
    google_drive_token: String,
    dropbox_token: String,
    onedrive_token: String
});

module.exports = mongoose.model('User', UserSchema);