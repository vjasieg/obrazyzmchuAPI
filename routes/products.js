var express = require('express');
var router = express.Router();
const productModel = require("../models/product");

router.get('/get', function(req, res, next) {
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

router.get('/get/:id', function(req, res, next) {
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



router.post('/post', function(req, res, next) {
  const product = new productModel({
    title: req.body.title,
    desc: req.body.desc,
    price: req.body.price,
    time: req.body.time,
    pics: req.body.pics
  });
  product.save().then(result => {
    return res.status(200).json({
      "result": "Dodano produkt."
    });
  }).catch(err => {
    res.status(500).send(err);
  })
});



module.exports = router;
