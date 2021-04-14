const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    title: {type: String, required: true},
    desc: {type: String, required: true},
    price: {type: Number, required: true},
    time: {type: Number, required: true},
    views: {type: String, default: 0},
    pics: {type: Array, required: true}
});

module.exports = mongoose.model('Product', productSchema);