var express = require('express');
var router = express.Router();
var fs = require("fs");
var adminAccountModel = require("../../../models/admin")
var bcrypt = require("bcrypt");

router.post('', (req, res, next) => {
    if(!(req.body.secret === process.env.PASSWORD)) {
        res.status(401).json({"result": "unauthorized"})
        return next()
    }

    bcrypt.hash(req.body.password, 10).then(hashed => {
        const account = new adminAccountModel({
            "username": req.body.username,
            "password": hashed
        });

        account.save().then(success => {
            res.status(200).json({"status": "admin account added successfully"})
        })
    })

})


module.exports = router;
