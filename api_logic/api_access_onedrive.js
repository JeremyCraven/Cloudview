var fs = require('fs');
var readline = require('readline');
var Promise = require('es6-promise').Promise;
var oned  = require("./onedrive-nodejs-api/oned");
//var app   = oned.app({ "client_id": "58054cc9-75fc-4e79-bfa2-8dac7656afbf", "client_secret": "LYFRbjrb5J5bjiRqmfaNY3b" });
const util = require('util')

var access = new Object();

access.user_info = function(access_token, res) {
  var app = oned.app(access_token); 

  app.user_info(function(status, reply){
      if(status == 200)
        res.send(reply);
      else
        res.send(get_error(status));
  });
}

access.move_stuff = function(access_token, item_id, dest_id, callback) {
  var app = oned.app(access_token); 

  app.move(item_id, dest_id, function(status, reply){
      if(status == 200)
        callback(reply);
      else
        callback(get_error(status));
  });
} 

access.edit_link = function(access_token, file_path, res) {
  var app = oned.app(access_token); 

  app.edit_link(file_path, function(status, reply){
      if(status == 200)
        res.send(reply);
      else
        res.send(get_error(status));
  });
}

access.download_link = function(access_token, file_path, res) {
  var app = oned.app(access_token); 

  app.download_link(file_path, function(status, reply){
      if(status == 200)
        res.send(reply);
      else
        res.send(get_error(status));
  });
}

access.delete = function(access_token, file_id, callback) {
  var app = oned.app(access_token); 

  app.delete(file_id, function(status, reply){
      if(status == 200)
        callback(reply);
      else
        callback(get_error(status));
  });
}

access.create_folder = function(access_token, folder_name, callback, folder_id) {
  var app = oned.app(access_token); 

  if(folder_id === undefined) {
    app.create_folder(folder_name, function(status, reply){
        if(status == 200)
          callback(reply);
        else
          callback(get_error(status));
    });
  } else {
    app.create_folder(folder_name, function(status, reply){
        if(status == 200)
          callback(reply);
        else  
          callback(get_error(status));
    }, folder_path);
  }
}

access.list_files = function(access_token, callback, folder_id) {
  var app = oned.app(access_token); 

  if(folder_id === null) {
    app.list_files(function(status, reply){
        if(status == 200) {
          callback(reply);
        }
        else {
          callback(get_error(status));
        }
    });
  } else {
    app.list_files(function(status, reply){
        if(status == 200)
          callback(reply);
        else
          callback(get_error(status));
    }, folder_id);
  }
}

access.search = function(access_token, search_term, res) {
  var app = oned.app(access_token); 

  app.search(search_term, function(status, reply){
      if(status == 200)
        res.send(reply);
      else
        res.send(get_error(status));
  });
}

var get_error = function(status_number) {
  switch (status_number) {
            case 200: 
              return "OK";
            case 202: 
              return "Accepted";
            case 204: 
              return "No content";
            case 400: 
              return "Bad request";
            case 401: 
              return "Unauthorized";
            case 403: 
              return "Forbidden";
            case 404: 
              return "Not found";
            case 405: 
              return "Not allowed";
            case 409: 
              return "Resource conflict";
            case 410: 
              return "Gone";
            case 411: 
              return "Length required";
            case 413: 
              return "Request entity too large";
            case 414: 
              return "Request URI too long";
            case 415: 
              return "Unsupported type";
            case 500: 
              return "Server error";
            case 501: 
              return "Not implemented";
            case 502: 
              return "Bad gateway";
            default: 
              return "Unknown response code";
        };
}

module.exports = access