const mongoose = require('mongoose');

const adminAccountsSchema = mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String, required: true}
});

module.exports = mongoose.model('AdminAccounts', adminAccountsSchema);
