<<<<<<< HEAD
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

=======
var mongoose = require('mongoose');
Schema = mongoose.Schema,
bcrypt = require('bcrypt'),
SALT_WORK_FACTOR = 10;

var UserSchema = new Schema({
  user_name: { type: String, required: true },
  user_id: { type: String, required: true, index: { unique: true } },
  user_email: { type: String, required: true, index: { unique: true } },
  password : { type: String, required: true },
  cloudview_session_token :  { type: String },
  google_accounts: [ { type: Schema.Types.ObjectId, ref: 'cloud_account' } ],
  dropbox_accounts: [ { type: Schema.Types.ObjectId, ref: 'cloud_account' } ],
  onedrive_accounts: [ { type: Schema.Types.ObjectId, ref: 'cloud_account' } ]
});

UserSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

>>>>>>> 55cbbde7c2a1a0b4ee0b9194046951e72f807cdb
module.exports = mongoose.model('User', UserSchema);