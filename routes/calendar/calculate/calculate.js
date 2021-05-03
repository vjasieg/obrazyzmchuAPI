var express = require('express');
var router = express.Router();
var weekModel = require("../../../models/weeks");
const productModel = require("../../../models/product");

function calculate(week, hours) {
    lastDay = 0;
    week.forEach((val, index) => {
        if((val + lastDay) - hours >= 0) {
            return index + 1
        }else {
            lastDay += val
        }
    })
}

function getDate(date, days) {
    return new Date(date.getTime() + 60 * 60000 + days * 24 * 60 * 60000);
}

router.get('', (req, res, next) => {

    var calculate = [];
    var hours;
    var weekIndex = 0;
    var dayIndex = 0;
    var weekName;

    productModel.find({"_id": req.body.productID}).exec().then(product => {
        hours = product[0].time
        weekModel.find({}).exec().then(weeks => {
            weeks.forEach((val, index) => {
                calculate.push( {[val.start.toDateString()]: JSON.parse(val.days)} )
            })
            calculate.some((days, index) => {
                weekName = Object.keys(days)[0]
                dayIndex = 0;
                Object.values(days)[0].some((day, index) => {
                    hours = hours - day
                    dayIndex = index
                    return hours <= 0
                })
                weekIndex++
                return hours <= 0
            })
            res.status(200).json({"result": getDate(new Date(weekName), (dayIndex)), "how_long": ((weekIndex - 1) * 7) + (dayIndex + 1)})
        }).catch(err => {})
    }).catch(err => {})
})


module.exports = router;