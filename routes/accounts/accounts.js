var express = require('express');
var app = express();
var accountAdd = require('./post/account_post');
var accountLogin = require('./post/account_login');

app.use('/add', accountAdd);
app.use('/login', accountLogin);

module.exports = app;
