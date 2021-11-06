var express = require('express');
var router = express.Router();
var fs = require('fs');
const productPicModel = require("../../../../models/productpic");
const productModel = require("../../../../models/product")

router.delete('', (req, res, next) => {
    productModel.findById({"_id": req.body.productID}).exec().then(product => {
        product.pics.forEach((val, index) => {
            console.log(val.replace("/files/", "").replace(".png", ""), req.body.picID)
            if(req.body.picID === val.replace("/files/", "").replace(".png", "")) {
                product.pics.splice(index, 1)
                product.save()
            }
        })
    })
    productPicModel.findById({"_id": req.body.picID}).exec().then(product => {
        fs.unlink("./static" + product.path, err => {})
        product.delete()
        res.status(200).json({"result": "usunieto"})
    }).catch(err => {
        res.status(500).json({"result": err})
    });
})

module.exports = router;
