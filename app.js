var express = require('express');
require('dotenv').config()
const mongoose = require('mongoose');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var productsRouter = require('./routes/products/products');
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
app.use('/products', productsRouter);
app.use('/products/views', productViewsRouter)


module.exports = app;
