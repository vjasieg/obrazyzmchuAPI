var express = require('express');
var router = express.Router();
var fs = require("fs");
var adminAccountModel = require("../../../models/admin")
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

router.post('', (req, res, next) => {
    adminAccountModel.find({username: req.body.username}).exec().then(result => {
        if(!(result.length >= 1)) {
            return res.status(409).json({"result": "Nie ma takiego użytkownika."})
        }
        bcrypt.compare(req.body.password, result[0].password, (err, status) => {
            if(status) {
                jwt.sign({
                    id: result[0]._id,
                    username: result[0].username,
                }, process.env.JWT, {expiresIn: "7d"}, (err, token) => {
                    console.log(token)
                    res.status(200).json({"token": token})
                })
            }else {
                res.status(409).json({"result": "Złe hasło/email!"})
            }
        })
    }).catch(err => {})
})


module.exports = router;
