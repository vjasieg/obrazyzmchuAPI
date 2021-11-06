var express = require('express');
var app = express();
var paymentPost = require('./post/payment_post')

app.use('/process', paymentPost);

module.exports = app;

