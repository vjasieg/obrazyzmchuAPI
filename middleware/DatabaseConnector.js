const mongoose = require('mongoose');
var express = require('express');
var app = express();

mongoose.connect(process.env.DBLINK, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(success => {
    console.log("Connected to the database.")
}).catch((r) => {
    console.log(r)
});

module.exports = app;
