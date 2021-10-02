var express = require('express');
var app = express();

var productsGet = require('./get/products_get');
var productsPost = require('./post/products_post');
var productViews = require('./views/views');
var productsDelete = require('./delete/products_delete');
var productPics = require('./pics/pics');
var picsDelete = require('./pics/delete/pics_delete');
var picsPost = require('./pics/post/pics_post');
var familyGet = require('./families/get/family_get');
var filtersGet = require('../../util/filters/filters');

app.use('/get', productsGet);
app.use('/post', productsPost);
app.use('/delete', productsDelete);
app.use('/views', productViews);
app.use('/pics', productPics);
app.use('/pics/post', picsPost);
app.use('/pics/delete', picsDelete);
app.use('/family/get', familyGet);
app.use('/filters/get', filtersGet);

module.exports = app;
