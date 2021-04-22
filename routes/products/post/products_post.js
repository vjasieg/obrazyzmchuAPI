var express = require('express');
var router = express.Router();
const productModel = require("../../../models/product");
const categories = require("../../../util/json/categories.json");
const productPicModel = require("../../../models/productpic");

function upload(file, product, order) {
  file.mv('./static/files/' + file.name, function(err) {
    const pic = new productPicModel({
      "path": "/files/" + file.name,
      "productID": product.id,
      "order": order
    });
    pic.save().then().catch(err => {
      return res.status(500).send(err);
    })
  });
}

router.post('', (req, res, next) => {
  if(!(req.body.secret === process.env.PASSWORD)) {
    return res.status(401).json({"result": "unauthorized"});
  }

  if(!categories.categories.includes(req.body.category)) {
    return res.status(400).json({"result": "nie ma takiej kategorii" + "(dostepne: " + categories.categories + ")"})
  }

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({"result": "brak pliku"});
  }

  var product;

  if(Object.keys(req.files).length === 1) {
    console.log('asdsad')
    file = req.files.file
    product = new productModel({
        title: req.body.title,
        desc: req.body.desc,
        category: req.body.category,
        price: req.body.price,
        time: req.body.time,
        pics: "/static/" + file.name
    });

    upload(file, product, 0)

  }else {
    var filelist = [];
    req.files.file.forEach((file, index) => {
      filelist.push("/static/" + file.name)
    })

    product = new productModel({
      title: req.body.title,
      desc: req.body.desc,
      category: req.body.category,
      price: req.body.price,
      time: req.body.time,
      pics: filelist
    });

    req.files.file.forEach((file, index) => {
      upload(file, product, index)
    })
  }


  product.save().then(result => {
    return res.status(200).json({
      "result": "Dodano produkt.",
      "id": product.id
    });
  }).catch(err => {
    //res.status(500).send(err);
  })
});



module.exports = router;
