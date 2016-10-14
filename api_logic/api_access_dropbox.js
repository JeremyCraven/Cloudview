var fs = require('fs');
var readline = require('readline');
var Promise = require('es6-promise').Promise;
var dbox  = require("dbox");
var app   = dbox.app({ "app_key": "mbvg6drwcnt8ijt", "app_secret": "o5dd4i6tp2ku5l9" });
const util = require('util')

var access = new Object();

var callbackHost = "http://localhost:8081"
var TOKEN_PATH = (process.env.HOME || process.env.HOMEPATH ||
    process.env.USERPROFILE) + '/.credentials/dropbox-api-token.json'

access.authorize = function(res, callback) {

  var promise = new Promise(function(resolve, reject) {   
    fs.readFile(TOKEN_PATH, function(err, token) {
      if (err) {
        app.requesttoken(function(status, request_token){
          var url = request_token.authorize_url + "&oauth_callback=" + callbackHost + "/authorized_dropbox";
          if (!(res === null)) { res.redirect(url); }
          console.log("request_token is " + util.inspect(request_token, false, null));
          resolve(request_token);
        });
      } else {
        if (!(res === null)) { res.redirect(callbackHost + "/authorized_dropbox"); }
        resolve(null);
      }
    });
  });

  promise.then(function(request_token) {
      callback(request_token);
  }, null);
}

access.authorized = function(request_token, res, callback) {
  var promise = new Promise(function(resolve, reject) {
    if (request_token === null) {
      fs.readFile(TOKEN_PATH, function(err, token) {
        resolve(JSON.parse(token));
      });
    } else {
      app.accesstoken(request_token, function(status, access_token){
        fs.writeFile(TOKEN_PATH, JSON.stringify(access_token));
        console.log("accesstoken is " + util.inspect(access_token, false, null));
        resolve(access_token);
      });
    }
  });
  

  // We need to store:
  // the request_token in our db FOR THIS USER
  // the access_token in our db FOR THIS USER SESSION
  promise.then(function(access_token) {
    callback(access_token);
  }, null);
}

access.account_info = function(access_token, res) {
  var client = app.client(access_token);
  client.account(function(status, reply){
      res.send(reply)
  })
}

access.show_all = function(access_token, file_path, res) {
  var client = app.client(JSON.stringify(access_token));
  var options = {
    root: "dropbox"
  }

  client.readdir(file_path, options, function(status, reply){
    console.log(status);
    res.send(reply);
  });
}

access.metadata = function(access_token, file_path, res) {
  var client = app.client(access_token);
  var options = {
    root: "dropbox"
  }
  client.metadata(file_path, options, function(status, reply){
    res(reply);
  });
}

access.get_link = function(access_token, file_path, res) {
  var client = app.client(access_token);
  var options = {
    root: "dropbox"
  }

  client.shares(file_path, options, function(status, reply){
    res.send(reply);
  });
}

access.get_streamable = function(access_token, file_path, res) {
  var client = app.client(access_token);
  var options = {
    root: "dropbox"
  }

  client.media(file_path, options, function(status, reply){
    res.send(reply);
  });
}

access.search = function(access_token, search, file_path, res) {
  var client = app.client(access_token);
  var options = {
    root: "dropbox"
  }

  client.search(file_path, search, options, function(status, reply){
    res.send(reply);
  });
}

access.create = function(access_token, file_path, text, res) {
  var client = app.client(access_token);
  var options = {
    root: "dropbox"
  }

  client.put(file_path, text, options, function(status, reply){
    res.send(reply);
  });
}

module.exports = access