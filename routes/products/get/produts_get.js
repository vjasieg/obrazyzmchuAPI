var express = require('express');
var router = express.Router();
const productModel = require("../../../models/product");

router.get('', function(req, res, next) {
    productModel.find({}, (err, products) => {
        if(!err) {
            var commentsMap = {};
            products.forEach((productModel) => {
                commentsMap[productModel._id] = productModel;
            });
            res.send(commentsMap);
            res.status(200);
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

router.get('/:id', function(req, res, next) {
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

module.exports = router;
