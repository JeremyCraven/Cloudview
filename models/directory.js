var mongoose = require('mongoose');

var DirectorySchema = new mongoose.Schema({
  name: String,
  id: String,
  user: { type: mongoose.Schema.ObjectId, ref: 'User' },
  files: [{ type: mongoose.Schema.ObjectId, ref: 'File'}],
  directories: [{ type: mongoose.Schema.ObjectId, ref: 'Directory'}],
  cloud: String,
  created_on: { type: Date },
  updated_on: { type: Date },
});

module.exports = mongoose.model('Challenge', DirectorySchema);