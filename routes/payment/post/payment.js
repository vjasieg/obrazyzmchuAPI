var express = require('express');
var router = express.Router();
const stripe = require('stripe')('sk_test_51JWQg9F28K26iHLntlObJmH3SgrAmbqVThbEeF3sX01zF0HpJyIDjDZnkYEhRmOZPCit7R2uFxQGWKx1ZsBua1v700UCkKN6Kb');
const productModel = require('../../../models/product')

router.post('/process', async (req, res, next) => {
    var products = JSON.parse(req.body.products);
    var price = 0;

   for (const id of products) {
        await productModel.find({_id: id}).exec().then(product => {
            console.log(product[0].price)
            price += parseFloat(product[0].price);
        })
    }

    const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(price * 100),
        currency: 'pln',
        payment_method_types: ['p24'],
    }).then(payment => {
        res.status(200).send({id: payment.id, secret: payment.client_secret})
    })


})

module.exports = router;
