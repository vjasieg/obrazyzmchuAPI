var express = require('express');
var router = express.Router();
const productModel = require("../../models/product");
var limit = require('express-rate-limit');

const rateLimit = limit({
    windowMs: 60 * 1000,
    max: 1,
    message: "{\"result\":\"przystopuj mordo z wyswietleniami\"}"
});

router.post('/add/:id', rateLimit, function(req, res, next) {
    productModel.findById({"_id": req.params.id}).exec().then(product => {
        product.views = product.views + 1;
        product.save().then(r => {
            res.status(200).json({"result": "success"})
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
