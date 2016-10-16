var path  = require("path")
var qs    = require("querystring")

module.exports = function(app_info){
  var client_id   = app_info.client_id;
  var client_secret = app_info.client_secret;

  return {
  	generate_oauth_url : function(redirect_uri, scopes, locale) {
      var oauth_url = "https://login.live.com/oauth20_authorize.srf?client_id=" + encode(client_id) + "&scope=";
      for (var i = scopes.length - 1; i >= 1; i--) {
        oauth_url += encode(scopes[i]) + "%20";
      }
      oauth_url += encode(scopes[0]) + "&response_type=code&redirect_uri=" + encode(redirect_uri) + "&locale=" + locale;
      return oauth_url;
    },

    generate_token_body : function(redirect_uri, token, use_refresh_token) {
      var body = "client_id=" + encode(client_id) + "&redirect_uri=" + encode(redirect_uri) + "&client_secret=" + encode(client_secret);
      if(use_refresh_token) {
        body += "&refresh_token=" + encode(token) + "&grant_type=refresh_token";
      } else {
        body += "&code=" + encode(token) + "&grant_type=authorization_code";
      }
      console.log(body);
    },

    url : function(query_path, access_token) {
      return encode("https://apis.live.net/v5.0/" + query_path + "?access_token=" + access_token);
    }
  }
}

var encode = function(data){
  return encodeURIComponent(data || "").
      replace(/\!/g, "%21").
      replace(/\'/g, "%27").
      replace(/\(/g, "%28").
      replace(/\)/g, "%29").
      replace(/\*/g, "%2A")
}