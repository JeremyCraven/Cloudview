var express = require('express');
var router = express.Router();

var api_access = require('../api_logic/api_access');

router.use((req, res, next) => {
    // Default route
    next();
});

router.route('/routes').get((req, res) => {
    res.json(router.stack);
});

router.route('/get_google_files').get((req, res) => {
	function saveAuth(auth) {
		var savedAuth = auth;
		function result(str) {
			res.send(str)
		}
		api_access.get_google_files(savedAuth, result)
	}

	api_access.login_google(saveAuth);
});

module.exports = router;