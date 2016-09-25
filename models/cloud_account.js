var mongoose = require('mongoose');
Schema = mongoose.Schema;

var CloudAccountSchema = new Schema({
  account_type: { type:String, required: true, enum: ['google', 'dropbox', 'onedrive' ]  },
  
  // This is our version of the account_id. It is account_type + actual_user_id
  // Ex: If google's user id is x45fhy, our account id for that account is
  // google-x45fhy
  account_id: { type: String, required: true },

  // Some accounts have only one token and some have two tokens
  access_token: { type: String, required: true },
  access_token_expiry : { type: Date, required:true },

  request_token: { type:String },
  request_token_expiry : { type: Date } 
});

module.exports = mongoose.model('cloud_account', CloudAccountSchema);