var express = require('express');
var router = express.Router();
const productModel = require("../models/product");

router.get('/get', function(req, res, next) {
  res.send(req.params.id);
});




router.get('/get/:id', function(req, res, next) {
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
