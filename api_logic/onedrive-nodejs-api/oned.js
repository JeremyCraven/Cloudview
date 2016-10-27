/*
var request = require("request")
var qs      = require("querystring")
var path    = require("path")
var helper = 

exports.app = function(app_info){
  var helper = require("./helper")(app_info);

  return {
  	authorize: function(redirect_uri, scopes, callback, locale) {
  		var oauth_url = helper.generate_oauth_url(redirect_uri, scopes, locale || "en");
  		callback(oauth_url);
  	},

  	request_token: function(redirect_uri, token, callback, use_refresh_token) {
      	var body = helper.generate_token_body(redirect_uri, token, use_refresh_token || false);
      	var args = {
        	"method": "POST",
        	"headers": { 
          	"content-type": "application/x-www-form-urlencoded",
          	"content-length": body.length
        	},
        	"url": "https://login.live.com/oauth20_token.srf",
        	"body": body
      	}
      	return request(args, function(e, r, b){
      		console.log("HELLO HERE");
        	callback(e ? null : r.statusCode, qs.parse(b));
      	})
    },

    client: function(access_code) {
    	var access_code = access_code;

    	return {
    		account_info: function(callback) {
	          var args = {
	            "method": "GET",
	            "url": helper.url("me", access_code),
	            "encoding": null
	          }
	          
	          return request(args, function(e, r, b) {
	            if (e) {
	              callback(r.statusCode, null);
	            } else {
	              callback(r.statusCode, qs.parse(b));
	            }
	          })
    		}
    	}
    }
  }
}*/

'use strict';
// var restler = require('restler');
var https = require('https');

var encode = function(data){
  return encodeURIComponent(data || "").
      replace(/\!/g, "%21").
      replace(/\'/g, "%27").
      replace(/\(/g, "%28").
      replace(/\)/g, "%29").
      replace(/\*/g, "%2A")
}

/*
onedrive.getToken = function(callback) {
  console.log('[Onedrive getToken] start');
  var dataToSend = 'client_id=' +
  				   '&redirect_uri=' +
  				   '&client_secret=' +
  				   '&refresh_token=' +
  				   '&grant_type=refresh_token';

  restler.post('https://login.live.com/oauth20_token.srf', {
    data: dataToSend
  }).on('complete', function(data, response) {
    if (response.statusCode == 200) {
      callback(200, data.access_token);
    } else {
      callback(response.statusCode);
    }
  });
};
*/

exports.app = function(access_token) {
	var access_token = access_token;
  var onedrive_host = "apis.live.net"
  var onedrive_base_path = "/v5.0/";

	return {
		get_edit_link : function(file_path, callback) {
      
      var options = {  
      host: onedrive_host,
      path: onedrive_base_path + file_path + '/shared_edit_link?access_token=' + access_token,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
      };

      var edit_link = https.request(options, function(response) {

      if (response.statusCode == 200) {

        var body = '';

        response.setEncoding('utf8');
        response.on('data', function(txt) {
          body += txt;
        });

        response.on('end', function() {
          callback(200, JSON.parse(body).link);
        });
      } else {
        callback(response.statusCode);
      }
      }).on('error', null);

      edit_link.end();
    },

    get_download_link : function(file_path, callback) {
    
      var options = {
        host: onedrive_host,
        path: onedrive_base_path + file_path + '/content?suppress_redirects=true&access_token=' + access_token,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      };

      var download_link = https.request(options, function(response) {
        if (response.statusCode == 200 || response.statusCode == 302) {

          var body = '';

          response.setEncoding('utf8');
          response.on('data', function(txt) {
            body += txt;
          });

          response.on('end', function() {
            callback(200, JSON.parse(body).location);
          });
        } else {
          callback(response.statusCode);
        }
      }).on('error', null);

      download_link.end();
    },

    delete : function(file_path, callback) {
      var options = {
        host: onedrive_host,
        path: onedrive_base_path + file_path + '?access_token=' + access_token,

        // who knew there was more than GET and POST?
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      };

      var delete_file = https.request(options, function(response) {

        if (response.statusCode == 204 || response.statusCode == 200) {
          var body = '';

          response.setEncoding('utf8');
          response.on('data', function(txt) {
            body += txt;
          });

          response.on('end', function() {
            callback(200, JSON.parse(body));
          });
        } else {
          callback(response.statusCode);
        }
      }).on('error', null);

      delete_file.end();
    },

    create_folder : function(folder_name, callback, folder_path) {
      var options = {
        host: onedrive_host,
        path: onedrive_base_path + 'me/skydrive/' + folder_path || '',
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + access_token,
          'Content-Type': 'application/json; charset=UTF-8'
        }
      };

      var new_folder = https.request(options, function(response) {
        if (response.statusCode == 201) {
          var body = '';

          response.on('data', function(txt) {
            body += txt;
          });

          response.on('end', function() {
            var responseData = JSON.parse(body);

            callback(200, responseData.id);
          });
        } else {
          callback(response.statusCode);
        }
      }).on('error', null);

      //new_folder.write('{"name" : "' + folderName + '"}');
      new_folder.end();
    },

    list_files : function(callback, folder_id) {
      var options = {  
        host: onedrive_host,
        path: onedrive_base_path + ( folder_id || 'me/skydrive' ) + '/files?access_token=' + access_token,
        method: 'GET',
        headers: {
          'Content-Type': ''
        }
      };

      var get_files = https.request(options, function(response) {
      if (response.statusCode == 200) {

        var body = '';

        response.setEncoding('utf8');
        response.on('data', function(txt) {
          body += txt;
        });
        response.on('end', function() {
          callback(200, JSON.parse(body));
        });
      } else {
        callback(response.statusCode);
      }
      });

      get_files.end();  
    },

    user_info : function(callback) {
      var options = {  
        host: onedrive_host,
        path: onedrive_base_path + 'me?access_token=' + access_token,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      };

      var user_details = https.request(options, function(response) {

      if (response.statusCode == 200) {

        var body = '';

        response.setEncoding('utf8');
        response.on('data', function(txt) {
          body += txt;
        });

        response.on('end', function() {
          callback(200, JSON.parse(body).link);
        });
      } else {
        callback(response.statusCode);
      }
      }).on('error', null);

      user_details.end();  
    },

    // AFAIK, OneDrive doesn't have a a search in specific folder function. Bastards.
    search : function(search_term, callback) {
      var options = {  
        host: onedrive_host,
        path: onedrive_base_path + 'me/skydrive/search?q=' + encode(search_term) + '&access_token=' + access_token,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      };

      var search_files = https.request(options, function(response) {

      if (response.statusCode == 200) {

        var body = '';

        response.setEncoding('utf8');
        response.on('data', function(txt) {
          body += txt;
        });

        response.on('end', function() {
          callback(200, JSON.parse(body).link);
        });
      } else {
        callback(response.statusCode);
      }
      }).on('error', null);

      search_files.end();  
    },

    //rename : function(old_name, new_name, callback) {
    // 
    //}

	}
}