var express = require('express');
require('dotenv').config()
const mongoose = require('mongoose');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');

var productsGetRouter = require('./routes/products/get/produts_get');
var productsPostRouter = require('./routes/products/post/products_post');
var productViewsRouter = require('./routes/products/views');

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
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/products/get', productsGetRouter);
app.use('/products/post', productsPostRouter);
app.use('/products/views', productViewsRouter)


module.exports = app;
