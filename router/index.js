var express = require('express');
var router = express.Router();

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

module.exports = router;