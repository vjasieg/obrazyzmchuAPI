var express = require('express');
var router = express.Router();
var fs = require('fs');
const productPicModel = require("../../../../models/productpic");

router.delete('', (req, res, next) => {
    if(!(req.body.secret === process.env.PASSWORD)) {
        res.status(401).json({"result": "unauthorized"});
        return next()
    }
    productPicModel.findById({"_id": req.body.picID}).exec().then(product => {
        fs.unlink("./static" + product.path, err => {})
        product.delete()
        res.status(200).json({"result": "usunieto"})
    }).catch(err => {
        res.status(500).json({"result": err})
    });
})

module.exports = router;