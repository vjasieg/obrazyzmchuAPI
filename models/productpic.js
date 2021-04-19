const mongoose = require('mongoose');

const productPicSchema = mongoose.Schema({
    path: {type: String, required: true},
    productID: {type: String, required: true},
    order: {type: String, required: true}
});

module.exports = mongoose.model('ProductPic', productPicSchema);