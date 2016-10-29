// Load required packages
var express = require('express');
var passport = require('passport');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var multer = require('multer');

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

// Multipart data
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './tmp/uploads');
    },
    filename: function(req, file, cb) {
        var split = file.originalname.split('.');
        var name = split[0];
        var extension = split[1];
        
        cb(null, 'upload-' + Date.now() + '.' + extension);
    }
});

app.use(multer({ storage: storage }).single('file'));

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