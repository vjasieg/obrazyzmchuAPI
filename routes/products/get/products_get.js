var express = require('express');
var router = express.Router();
const productModel = require("../../../models/product");

router.get('', function(req, res, next) {
    productModel.find({}, (err, products) => {
        if(!err) {
            res.status(200).json(products)
        }else {
            res.status(500);
        }
    });
});

router.get('/sort/:limit', function(req, res, next) {
    productModel.find({}).sort([['views', -1]]).limit(parseInt(req.params.limit)).then((result, err) => {
        if(!err) {
            res.status(200).json({"result": result})
        }else {
            res.status(500).json({"result": err})
        }
    });
});

router.get('/id/:id', function(req, res, next) {
    productModel.findById({"_id": req.params.id}).exec().then(product => {
        res.status(200).json({
            "title": product.title,
            "desc": product.desc,
            "price": product.price,
            "time": product.time,
            "views": product.views,
            "pics": product.pics
        });
    }).catch(err => {
        if(err) {
            res.status(500).json({
                "err": err
            });
        }
    });
});

router.get('/filters', function(req, res, next) {
    var response = {}
    var size, pattern, color, category;

    (req.query.category === undefined) ? category = { $regex: /./} : category = req.body.category;
    (req.query.size === undefined) ? size = { $regex: /./} : size = req.body.size;
    (req.query.color === undefined) ? color = { $regex: /./} : color = req.body.color;
    (req.query.pattern === undefined) ? pattern = { $regex: /./} : pattern = req.body.pattern;
    productModel.find({"size": size, "color": color, "pattern": pattern, "category": category}).exec().then(product => {
        res.status(200).json(product);
    })
});

module.exports = router;
