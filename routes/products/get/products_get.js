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
    var size, pattern, color, category, family;
    (req.query.category === undefined) ? category = 'null' : category = req.query.category;
    (req.query.size === undefined) ? size = 'null' : size = req.query.size;
    (req.query.color === undefined) ? color = 'null' : color = req.query.color;
    (req.query.pattern === undefined) ? pattern = 'null' : pattern = req.query.pattern;
    (req.query.family === undefined) ? family = 'null' : family = req.query.family;

    var obj = [
        {$or: []},
        {$or: []},
        {$or: []},
        {$or: []},
        {$or: []}
    ];

    category = category.split(",")
    size = size.split(",")
    color = color.split(",")
    pattern = pattern.split(",")
    family = family.split(",")

    category.forEach((val, index) => {
        if(val !== 'null') {
            obj[0].$or.push({"category": val})
        }else {
            obj[0].$or.push({"category": { $regex: /./}})
        }
    })
    size.forEach((val, index) => {
        if(val !== 'null') {
            obj[1].$or.push({"size": val})
        }else {
            obj[1].$or.push({"size": { $regex: /./}})
        }
    })
    pattern.forEach((val, index) => {
        if(val !== 'null') {
            obj[2].$or.push({"pattern": val})
        }else {
            obj[2].$or.push({"pattern": { $regex: /./}})
        }
    })
    color.forEach((val, index) => {
        if(val !== 'null') {
            obj[3].$or.push({"color": val})
        }else {
            obj[3].$or.push({"color": { $regex: /./}})
        }
    })
    family.forEach((val, index) => {
        if(val !== 'null') {
            obj[4].$or.push({"family": val})
        }else {
            obj[4].$or.push({"family": { $regex: /./}})
        }
    })
    productModel.find({$and: obj}).exec().then(product => {
        res.status(200).json(product);
    })
});

module.exports = router;
