var assert = require('assert');
var server = require('../server.js')
var http = require('http');

describe('Our API', function() {
	it('check authorize dropbox is alive', function(done) {
		http.get('http://localhost:8081/authorize_dropbox', function(res) {
			assert.equal(200, res.statusCode);
      		done();
		});
	});

	after(function() {
		server.server.close();
	});
});