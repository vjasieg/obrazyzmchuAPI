var express = require('express');
var router = express.Router();
var weekModel = require("../../../../models/weeks");

router.get('', (req, res, next) => {

    weekModel.find({}).exec().then(r => {
        res.status(200).json(r)
    }).catch(err => {
        res.status(500).json(err)
    })
})



module.exports = router;
