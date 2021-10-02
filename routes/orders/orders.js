var express = require('express');
var app = express();

var orderPost = require('../orders/post/order_post');

app.use('/post', orderPost);

module.exports = app;
