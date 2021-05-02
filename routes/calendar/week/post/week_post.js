var express = require('express');
var router = express.Router();
var weekModel = require("../../../../models/weeks");

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

router.post('', (req, res, next) => {

    if(!(req.body.secret === process.env.PASSWORD)) {
        res.status(401).json({"result": "unauthorized"})
        return next()
    }

    const week = new weekModel({
        start: req.body.start,
        end: req.body.end,
        days: req.body.days
    });

    week.save();
})

module.exports = router;
