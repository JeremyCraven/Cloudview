var fs = require('fs');
var readline = require('readline');
var Promise = require('es6-promise').Promise;
var oned  = require("./oned");
var app   = oned.app({ "client_id": "58054cc9-75fc-4e79-bfa2-8dac7656afbf", "client_secret": "LYFRbjrb5J5bjiRqmfaNY3b" });
const util = require('util')

var access = new Object();

var callbackHost = "http://localhost:8081"
var TOKEN_PATH = (process.env.HOME || process.env.HOMEPATH ||
    process.env.USERPROFILE) + '/.credentials/onedrive-api-token.json'

access.authorize = function(res) {

  fs.readFile(TOKEN_PATH, function(err, token) {
      if (err) {
        app.requesttoken(callbackHost + "/authorized_onedrive", ["wl.basic", "wl.offline_access", "wl.skydrive_update"]);
      } else {
        if (!(res === null)) { 
          res.redirect(callbackHost + "/authorized_onedrive"); 
        }
      }
  }
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