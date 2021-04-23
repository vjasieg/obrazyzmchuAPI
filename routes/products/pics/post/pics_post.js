var express = require('express');
var router = express.Router();
var fs = require('fs');
var mongoose = require("mongoose")
const productPicModel = require("../../../../models/productpic");

function upload(file, productid, order, id) {
    file.mv('./static/files/' + id + ".png", function(err) {
        const pic = new productPicModel({
            "_id": id,
            "path": "/files/" + id + ".png",
            "productID": productid,
            "order": order
        });
        pic.save().then().catch(err => {
            return res.status(500).send(err);
        })
    });
}

router.post('', (req, res, next) => {
    if(!(req.body.secret === process.env.PASSWORD)) {
        res.status(401).json({"result": "unauthorized"});
        return next()
    }

    var id = mongoose.Types.ObjectId();
    file = req.files.file
    const pic = new productPicModel({
        "_id": id,
        "path": "/files/" + id + ".png",
        "productID": req.body.productID,
        "order": req.body.order
    });
    upload(file, req.body.productid, req.body.order, id)
    res.status(200).json({"result": "wyslano zdjecie", "pic_id": id})
});

module.exports = router;