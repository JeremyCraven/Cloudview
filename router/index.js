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

var savedAuth = null

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
	api_access.get_google_files(savedAuth, null, result)
});

module.exports = router;