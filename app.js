var express = require('express');
require('dotenv').config()
const mongoose = require('mongoose');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
const fileUpload = require('express-fileupload');

var productsGetRouter = require('./routes/products/get/products_get');
var productsPostRouter = require('./routes/products/post/products_post');
var productViewsRouter = require('./routes/products/views');
var productsDeleteRouter = require('./routes/products/delete/products_delete');
var productPicsRouter = require('./routes/products/pics/pics');
var picsDeleteRouter = require('./routes/products/pics/delete/pics_delete');
var picsPostRouter = require('./routes/products/pics/post/pics_post');
var categoriesRouter = require('./routes/products/categories/categories');
var filtersRouter = require('./util/filters/filters');

var orderPostRouter = require('./routes/orders/post/order_post');


var cors = require("cors");
var app = express();

//connecting to db
mongoose.connect(process.env.DBLINK, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).catch((r) => {
    console.log(r)
});


app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(fileUpload())
app.use(express.static(path.join(__dirname, 'static')));


app.use('/', indexRouter);
app.use('/products/get', productsGetRouter);
app.use('/products/post', productsPostRouter);
app.use('/products/delete', productsDeleteRouter);
app.use('/products/views', productViewsRouter);
app.use('/products/pics', productPicsRouter);
app.use('/products/pics/post', picsPostRouter);
app.use('/products/pics/delete', picsDeleteRouter);
app.use('/categories', categoriesRouter);
app.use('/order/post', orderPostRouter);
app.use('/filters/get', filtersRouter);


module.exports = app;
