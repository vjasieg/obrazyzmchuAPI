var express = require('express');
var router = express.Router();
const productModel = require("../../../models/product");
const categories = require("../../../util/json/categories.json");
const productPicModel = require("../../../models/productpic");


router.post('', (req, res, next) => {
  if(req.body.secret === process.env.PASSWORD) {
    if(categories.categories.includes(req.body.category)) {

      if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({"result": "brak pliku"});
      }

      var filelist = [];
      req.files.file.forEach((file, index) => {
        filelist.push("/static/" + file.name)
      })

      const product = new productModel({
        title: req.body.title,
        desc: req.body.desc,
        category: req.body.category,
        price: req.body.price,
        time: req.body.time,
        pics: filelist
      });

      req.files.file.forEach((file, index) => {
        file.mv('./static/files/' + file.name, function(err) {
          if (err) {
            //return res.status(500).send(err);
          }
          const pic = new productPicModel({
            "path": "/files/" + file.name,
            "productID": product.id,
            "order": index
          });
          pic.save().then().catch(err => {
            //res.status(500).send(err);
          })
        });
      })

      product.save().then(result => {
        return res.status(200).json({
          "result": "Dodano produkt.",
          "id": product.id
        });
      }).catch(err => {
        //res.status(500).send(err);
      })

    }else {
      res.status(400).json({"result": "nie ma takiej kategorii" + "(dostepne: " + categories.categories + ")"})
    }
  }else {
    res.status(401).json({"result": "unauthorized"});
  }
});



module.exports = router;
