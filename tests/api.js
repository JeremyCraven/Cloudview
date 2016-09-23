var assert = require('assert');
var server = require('../server.js')

describe('Our API', function() {
	it('do nothing', function() {

	});

	after(function() {
		server.server.close();
	});
});