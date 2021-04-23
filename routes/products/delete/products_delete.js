var express = require('express');
var router = express.Router();
const productModel = require("../../../models/product");
const productPicModel = require("../../../models/productpic");
const fs = require("fs")

router.delete('', (req, res, next) => {
    if(!(req.body.secret === process.env.PASSWORD)) {
        res.status(401).json({"result": "unauthorized"});
        return next()
    }
    productModel.findById({"_id": req.body.productID}).exec().then(product => {
        pics = product.pics
        pics.forEach((val, index) => {
            fs.unlink("./static/" + val, (err => {})) //delete pic files
        })
        productPicModel.find({"productID": req.body.productID}).exec().then(pic => {
            pic.forEach((val, index) => {
                val.delete() // delete pics
            })
        }).catch(err => {
            res.status(500).json({"result": err})
        })
        product.delete() //delete product at the end
        res.status(200).json({"result": "deleted", "productID": req.body.productID})
    }).catch(err => {
        res.status(500).json({"result": err});
    });

})

module.exports = router;