// Load required packages
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

// MODELS

// MONGO
//mongoose.connect('mongodb://localhost:27017/db_name');

// Create the app
var app = express();

// App use
app.use(bodyParser.json());
app.use(express.static(__dirname + '/client'));

// Register all our routes
app.use('/', require('./router'));

// Get the port
var port = process.env.PORT || 8081;

// Start the server
app.listen(port, () => {
    console.log(`Server listening on port: ${port}`);
});