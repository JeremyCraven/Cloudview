var mongoose = require('mongoose');

var CloudAccountSchema = new mongoose.Schema({
    accountType: { type: String, required: true, enum: ['google', 'dropbox', 'onedrive'] },

    // This is our version of the account_id. It is account_type + actual_user_id
    // Ex: If google's user id is x45fhy, our account id for that account is
    // google-x45fhy
    accountId: { type: String, required: true },

    // Access token
    accessToken: { type: String, required: true },

    // Optional Refresh Token
    refreshToken: String,

    // Optional expiry time of token
    expiry: Number
});

module.exports = mongoose.model('CloudAccount', CloudAccountSchema);