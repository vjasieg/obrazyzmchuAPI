var express = require('express');
var router = express.Router();
const filters = require("../../../../util/json/filters.json");

router.get('', function(req, res, next) {
    res.status(200).json(filters.filters.family)
});

module.exports = router;
