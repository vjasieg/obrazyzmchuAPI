const jwt = require("jsonwebtoken");


module.exports = (req, res, next) => {
    const authHeader = req.headers['authorization']
    if (authHeader == null) return res.sendStatus(401)
    jwt.verify(authHeader, process.env.JWT, (err, decoded) => {
        if (err) return res.sendStatus(403);
        req.user = decoded;
        next();
    });
}
