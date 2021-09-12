const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    productID: {type: Array, required: true},
    name: {type: String, required: true},
    surname: {type: String, required: true},
    telephone_number: {type: String, required: true},
    address: {type: String, required: true},
    address2: {type: String, required: true},
    postalCode: {type: String, required: true},
    city: {type: String, required: true},
    country: {type: String, required: true},
    quantity: {type: String, required: true},
    email: {type: String, required: true},
    payment_method: {type: String, required: true},
    delivery_method: {type: String, required: true}
});

module.exports = mongoose.model('Order', orderSchema);