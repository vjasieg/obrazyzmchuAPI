const mongoose = require('mongoose');

const weekSchema = mongoose.Schema({
    start: {type: Date, required: true},
    end: {type: Date, required: true},
    days: {type: Array, required: true}
});

module.exports = mongoose.model('Weeks', weekSchema);