const mongoose = require('mongoose');
const timeZone = require('mongoose-timezone');

const weekSchema = mongoose.Schema({
    start: {type: Date, required: true},
    end: {type: Date, required: true},
    days: {type: String, required: true}
});

weekSchema.plugin(timeZone);
module.exports = mongoose.model('Weeks', weekSchema);