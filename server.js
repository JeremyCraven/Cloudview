// Load required packages
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

// MODELS
var Directory = require('./models/directory');

// MONGO
mongoose.connect('mongodb://localhost:27017/cloudview');

// Create the app
var app = express();

// App use
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static(__dirname + '/client'));

// Register all our routes
app.use('/', require('./router'));

// Get the port
var port = process.env.PORT || 8081;

// Start the server
var server = app.listen(port, () => {
    console.log(`Server listening on port: ${port}`);
});

exports.server = server