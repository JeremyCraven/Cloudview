var request = require("request")
var qs      = require("querystring")
var path    = require("path")

exports.app = function(app_info){
  var helper = require("./helper")(app_info);

  return {
  	authorize: function(redirect_uri, scopes, locale) {
  		var oauth_url = helper.generate_oauth_url(redirect_uri, scopes, locale || "en");
  		res.redirect(oauth_url);
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