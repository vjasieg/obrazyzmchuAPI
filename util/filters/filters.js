var express = require('express');
var router = express.Router();
var filters = require("../json/filters.json")

router.get('', (req, res, next) => {
    res.status(200).json(filters.filters)
})

module.exports = router;