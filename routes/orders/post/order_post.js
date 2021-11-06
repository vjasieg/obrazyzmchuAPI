var express = require('express');
var router = express.Router();
var fs = require('fs');
var mongoose = require("mongoose")
var orderModel = require("../../../models/order")
var productModel = require("../../../models/product")
var email_regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


router.post('', (req, res, next) => {

    productModel.findOne({"_id": req.body.productID}).exec().then(product => {
        if(!product) {
            res.status(400).json({"result": "nie ma produktu z takim productID!"})
            next()
        }
    })

    if(!email_regex.test(String(req.body.email).toLowerCase())) {
        res.status(400).json({"result": "adres email w niepoprawnym formacie :("})
        next()
    }

    const order = new orderModel({
        productID: req.body.productID,
        name: req.body.name,
        surname: req.body.surname,
        telephone_number: req.body.telephone_number,
        address: req.body.address,
        address2: req.body.address2,
        postalCode: req.body.postalCode,
        quantity: req.body.quantity,
        email: req.body.email,
        payment_method: req.body.payment_method,
        delivery_method: req.body.delivery_method
    });

    order.save().then(success => {
        res.status(200).json({"result": "zapisano order"})
    })
})

module.exports = router;
