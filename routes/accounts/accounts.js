var express = require('express');
var app = express();
var accountAdd = require('./post/account_post');
var accountLogin = require('./post/account_login');
var accountVerify = require('./account_verify');

app.use('/add', accountAdd);
app.use('/login', accountLogin);
app.use('/verify', accountVerify)

module.exports = app;
