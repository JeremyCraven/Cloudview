var express = require('express');
var router = express.Router();

var api_access = require('../api_logic/google_access');
var api_access_dropbox = require('../api_logic/api_access_dropbox');

router.use((req, res, next) => {
    // Default route
    next();
});

router.route('/').get((req, res) => {
    console.log('Got here');
});

router.route('/routes').get((req, res) => {
    res.json(router.stack);
});

router.route('/create_account').get((req, res) => {
	res.json({
		status: 200
	});
});

router.route('/login').post((req, res) => {
    // Check if user exists

    // If user exists
    res.json({
    	cloudViewToken: 'fakeCloudViewToken'
    });

    // else return 403
});

router.route('/signup').post((req, res) => {
	res.json({
		things: true
	})
});

var savedAuth = null
var dropboxSavedToken = null

router.route('/api/v1/get_files').get((req, res) => {
	var folder = req.query.folderId;
	if (folder === null) {
		res.json(JSON.stringify({
			nextPageToken: 'hey mitch',
			files: [
				{
					mimeType: 'heh',
					id: '1',
					name: 'two',
					parents: 'root',
					webViewLink: 'http://www.google.com'
				},
				{
					mimeType: 'heh',
					id: '2',
					name: 'three',
					parents: 'root',
					webViewLink: 'http://www.google.com'
				},
				{
					mimeType: 'heh',
					id: '3',
					name: 'four',
					parents: 'root',
					webViewLink: 'http://www.google.com'
				},
				{
					mimeType: 'heh',
					id: '4',
					name: 'five',
					parents: 'root',
					webViewLink: 'http://www.google.com'
				},
				{
					mimeType: 'heh',
					id: '5',
					name: 'six',
					parents: 'root',
					webViewLink: 'http://www.google.com'
				}
			]
		}));
	} else if (folder === 'test') {
		res.json(JSON.stringify({
			nextPageToken: 'hey mitch',
			files: [
				{
					mimeType: 'heh',
					id: '10',
					name: 'look_at_that',
					parents: 'test',
					webViewLink: 'http://www.facebook.com'
				},
			]
		}));
	}
});

router.route('/authorize_google').get((req, res) => {
	function saveAuth(auth) {
		savedAuth = auth;
		res.send("saved auth");
	}

	api_access.login_google(saveAuth);
});

router.route('/get_google_files').get((req, res) => {
	function result(obj) {
		res.json(obj)
	}
	var folder = req.query.folderId;
	api_access.get_google_files(savedAuth, folder, null, result)
});

router.route('/upload_google_text').get((req, res) => {
	function result(obj) {
		res.json(obj)
	}
	var fileObj = {mimeType: 'text/plain', body: 'hello world!'};
	api_access.put_google_file(savedAuth, "hello.txt", fileObj, result)
});

router.route('/authorize_dropbox').get((req, res) => {
		function saveAuth(auth) {
		savedAuth = auth;
	}
	api_access_dropbox.authorize(res, saveAuth);
});

router.route('/authorized_dropbox').get((req, res) => {
	function saveAuth(auth) {
		dropboxSavedToken = auth;
		res.send("Thank you for authorizing your Dropbox account! :) </br><a href = \"./dropbox_temp_available\">Click here to see what you can do!</a>")
	}
	api_access_dropbox.authorized(savedAuth, res, saveAuth);
});

router.route('/dropbox_temp_available').get((req, res) => {
	res.send("<a href = \"./dropbox_account_info\">/dropbox_account_info</a></br>" +
	//"<a href = \"./dropbox_all\">/dropbox_all</a> -> Shows <a href=\"http://media.giphy.com/media/wPrqe5846Z9GU/giphy.gif\">everything</a> recursively in dropbox_all/file_path dir. Default is root</br>" + 
	"<a href = \"./dropbox_file_metadata\">/dropbox_file_metadata</a> -> Go to /dropbox_file_metadata/file_path for specific file. Example, /dropbox_file_metadata/Photos/hello.png</br>" + 
	"<a href = \"./dropbox_file_link\">/dropbox_file_link</a> -> Same as above </br>" + 
	"<a href = \"./dropbox_file_stream\">/dropbox_file_stream</a> -> Same as above (Only applies to downloadable files)</br>" +
	"<a href = \"./dropbox_search/foo/\">/dropbox_search/foo/</a> -> /to_search/where_to_search</br>" +
	"<a href = \"./dropbox_create/foo/Hello%20World\">/dropbox_create/foo/Hello%20World</a> -> Uploads foo.txt in root with text 'Hello World'</br>");

});

router.route('/dropbox_account_info').get((req, res) => {
	api_access_dropbox.account_info(dropboxSavedToken, res);
});

router.route('/dropbox_all/:file_path(*)?').get((req, res) => {
	console.log("GOT : " + get_path(req));
	api_access_dropbox.show_all(dropboxSavedToken, get_path(req), res);
});

router.route('/dropbox_file_metadata/:file_path(*)?').get((req, res) => {
	api_access_dropbox.metadata(dropboxSavedToken, get_path(req), res);
});

router.route('/dropbox_file_link/:file_path(*)?').get((req, res) => {
	api_access_dropbox.get_link(dropboxSavedToken, get_path(req), res);
});

router.route('/dropbox_file_stream/:file_path(*)?').get((req, res) => {
	api_access_dropbox.get_streamable(dropboxSavedToken, get_path(req), res);
});

router.route('/dropbox_search/:search/:file_path(*)?').get((req, res) => {
	api_access_dropbox.search(dropboxSavedToken, req.params.search, get_path(req), res);
});

router.route('/dropbox_create/:file_name/:text').get((req, res) => {
	api_access_dropbox.create(dropboxSavedToken, req.params.file_name + ".txt", req.params.text, res);
});

function get_path(req) {
	return !req.params.file_path ? '' : req.params.file_path
}

module.exports = router;