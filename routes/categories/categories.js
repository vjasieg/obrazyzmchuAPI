var express = require('express');
var app = express();
var categoriesGet = require("./get/categories_get")
var categoriesPost = require("./post/categories_post")
var categoriesDelete = require("./delete/categories_delete")
var router = express.Router();
var authenticate = require('../../middleware/Authenticate');

app.use("/get", categoriesGet);

app.use(authenticate);

app.use("/post", categoriesPost);
app.use('/delete', categoriesDelete);

module.exports = app;
