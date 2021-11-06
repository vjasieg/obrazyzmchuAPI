var express = require('express');
var router = express.Router();
var fs = require("fs");
const categories = require("../../../util/json/categories.json");

router.post('/add', (req, res, next) => {

    cat = categories
    cat.categories.push(req.body.category)
    console.log(cat)
    fs.writeFile('./util/json/categories.json', JSON.stringify(cat), function(err) {
            if (err) throw err;
        }
    );
    res.status(200).json({"result": "dodano kategorie"});
})


module.exports = router;
