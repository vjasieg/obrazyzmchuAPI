var express = require('express');
var router = express.Router();
const productPicModel = require("../../../models/productpic");

router.get('/get/:id/:sort', (req, res, next) => {
    var order;
    if(req.params.sort === "asc") { order = 1 } else { order = -1 }
    productPicModel.find({"productID": req.params.id}).sort([['order', order]]).exec().then(pic => {
        res.status(200).json(pic)
    }).catch(err => {
        res.status(500).json({"result": err})
    })
});

router.post('/order/change/:id', (req, res, next) => {
    if(!(req.body.secret === process.env.PASSWORD)) {
        res.status(401).json({"result": "podaj dobry secret"})
        return next()
    }
    console.log(req.params.id)
    productPicModel.findById({"_id": req.params.id}).exec().then(pic => {
        pic.order = req.body.order;
        pic.save().then(
            res.status(200).json({"result": "zmieniono order"})
        ).catch(err => {
            res.status(500).send(err);
        })
    })
});

module.exports = router;