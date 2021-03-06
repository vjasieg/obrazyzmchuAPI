var express = require('express');
var router = express.Router();
var weekModel = require("../../../../models/weeks");

router.post('', (req, res, next) => {

    const week = new weekModel({
        start: req.body.start,
        end: req.body.end,
        days: req.body.days
    });

    week.save();
    res.status(200).json({"result": "dodano tydzien!"})
})

module.exports = router;
