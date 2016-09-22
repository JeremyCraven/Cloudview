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

describe('API Wrapper', function() {
	
	google_access.service.files.list = function() {

	}
	google_access.service.files.get = function() {

	}
	
	describe('#put', function() {
		it('can put file', function(done) {

			google_access.service = new Object();
			google_access.service.files = new Object();
			google_access.service.files.create = function(req, cb) {
				assert('resource' in req); // We have the metadata
				assert('media' in req); // We have a file
				assert('auth' in req); // We have an auth token
				assert('name' in req.resource); // We have a file name
				assert('body' in req.media); // We have content
				assert('mimeType' in req.resource && 'mimeType' in req.media
					&& req.resource.mimeType === req.media.mimeType); // mimeTypes match

				cb(null, {
					mimeType: req.resource.mimeType,
					id: 'naaaa',
					name: req.resource.name,
					parents: ['naaa_again'],
					webContentLink: 'notaurl',
					webViewLink: 'notaurl'
				});
			}

			google_access.put_google_file(new Object(), 'test', 
				{mimeType: 'text/plain', body: 'hello world!'}, function(obj) {
					assert(obj != null);
					assert('id' in obj); // Make sure we got an id
					assert('webContentLink' in obj || 'webViewLink' in obj); // Make sure we have a url
					done();
			});
		});
	});
});