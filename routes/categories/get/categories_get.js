var express = require('express');
var router = express.Router();
var fs = require("fs");
const categories = require("../../../util/json/categories.json");

router.get('', (req, res, next) => {
    res.status(200).json(categories)
})


module.exports = router;
