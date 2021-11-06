var express = require('express');
var router = express.Router();
const stripe = require('stripe')('sk_test_51JWQg9F28K26iHLntlObJmH3SgrAmbqVThbEeF3sX01zF0HpJyIDjDZnkYEhRmOZPCit7R2uFxQGWKx1ZsBua1v700UCkKN6Kb');
const productModel = require('../../../models/product')
var limit = require('express-rate-limit');

const rateLimit = limit({
    windowMs: 30 * 1000,
    max: 1,
    message: "{\"result\":\"try again in 30 seconds!\"}"
});

router.post('', rateLimit, async (req, res, next) => {
    var price = 0;
   for (const obj of req.body) {
        await productModel.find({_id: obj._id}).exec().then(product => {
            price += parseFloat(product[0].price) * obj.amount
        })
    }
   console.log(price)

    const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(price * 100),
        currency: 'pln',
        payment_method_types: ['p24'],
    }).then(payment => {
        res.status(200).send({id: payment.id, secret: payment.client_secret})
    })


})

module.exports = router;
