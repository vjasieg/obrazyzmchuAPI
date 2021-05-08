const mongoose = require('mongoose');

const productFamilySchema = mongoose.Schema({
    familyname: {type: String, required: true},
    products: {type: Array}
});

module.exports = mongoose.model('ProductFamily', productFamilySchema);