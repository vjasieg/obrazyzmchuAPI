var express = require('express');
var app = express();
var productRouter = require('./products/products')
var calendarRouter = require("./calendar/calendar")
var categoriesRouter = require("./categories/categories")
var orderRouter = require("./orders/orders")
var paymentRouter = require('./payment/payments')
var accountsRouter = require('./accounts/accounts')

app.use("/products", productRouter)
app.use("/calendar", calendarRouter)
app.use("/categories", categoriesRouter)
app.use("/order", orderRouter)
app.use("/payment", paymentRouter)
app.use("/accounts", accountsRouter)

module.exports = app;
