var express = require('express');
var router = express.Router();
const productModel = require("../../../models/product");
const categories = require("../../../util/json/categories.json");


router.post('', function(req, res, next) {
  if(req.body.secret === process.env.PASSWORD) {
    if(categories.categories.includes(req.body.category)) {
      const product = new productModel({
        title: req.body.title,
        desc: req.body.desc,
        category: req.body.category,
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
    }else {
      res.status(400).json({"result": "nie ma takiej kategorii" + "(dostepne: " + categories.categories + ")"})
    }
  }else {
    res.status(401).json({"result": "unauthorized"});
  }
});



module.exports = router;
