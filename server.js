// Load required packages
var express = require('express');
var passport = require('passport');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var session = require('express-session');

// MODELS
var Directory = require('./models/directory');

// MONGO
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/cloudview');

// Create the app
var app = express();

// App configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static(__dirname + '/client'));
app.use(passport.initialize())
app.use('/api/v1', require('./router'));

// Get the port
var port = process.env.PORT || 8081;

// Start the server
var server = app.listen(port, () => {
    console.log(`Server listening on port: ${port}`);
});

exports.server = server