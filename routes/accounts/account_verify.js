var express = require('express');
var router = express.Router();
var jwt = require("jsonwebtoken");

router.get('', (req, res, next) => {
    const authHeader = req.headers['authorization']
    if (authHeader === "") return res.status(401).json({"result": "no token provided"})
    jwt.verify(authHeader, process.env.JWT, (err, decoded) => {
        if (err) {
            res.status(403).json({"result": "bad token"})
        } else {
            res.status(200).json({"result": "good token", "user": decoded})
        }
    });
})

module.exports = router;
