var express = require('express');
var app = express();
var weekPost = require('./week/post/week_post');
var weekGet = require('./week/get/week_get');
var calendarCalculate = require('./calculate/calculate');
var authenticate = require('../../middleware/Authenticate');

app.use(authenticate);

app.use('/weeks/post', weekPost);
app.use('/weeks/get', weekGet);
app.use('/calculate', calendarCalculate);

module.exports = app;
