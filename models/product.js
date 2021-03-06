const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    title: {type: String, required: true},
    desc: {type: String, required: true},
    category: {type: String, required: true},
    price: {type: Number, required: true},
    time: {type: Number, required: true},
    views: {type: Number, default: 0},
    pics: {type: Array, required: true},
    size: {type: String, required: true},
    color: {type: String, required: true},
    colorhex: {type: String, required: true},
    pattern: {type: String, required: true},
    family: {type: String, required: true}
});

module.exports = mongoose.model('Product', productSchema);