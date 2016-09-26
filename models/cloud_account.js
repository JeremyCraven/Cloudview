var mongoose = require('mongoose');

var CloudAccountSchema = new mongoose.Schema({
    account_type: { type:String, required: true, enum: ['google', 'dropbox', 'onedrive' ]  },

    // This is our version of the account_id. It is account_type + actual_user_id
    // Ex: If google's user id is x45fhy, our account id for that account is
    // google-x45fhy
    account_id: { type: String, required: true },

    // Access token
    access_token: { type: String, required: true },
    access_token_expire : { type: Date, required:true },

    // Optional Refresh Token
    refresh_token: { type:String },
    refresh_token_expire : { type: Date }
});

module.exports = mongoose.model('CloudAccount', CloudAccountSchema);