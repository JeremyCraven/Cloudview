var assert = require('assert');
var google_access = require('../api_logic/google_access');

describe('Google API', function() {
	describe('#connect', function() {
		it('can connect to api', function(done) {
	    	req = {}
	    	console.log("hey")
	    	google_access.service.about.get(req, function(err, response) {
	    		// Should get a 401 since we haven't authenticated
	    		assert.equal(err.code, 401);
	    		done();
	    	});
	    });
	});
});