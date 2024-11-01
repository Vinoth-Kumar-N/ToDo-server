const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticateJWT = (req, res, next) => {
    let token = req.header('Authorization');

    if(!token) return res.status(400).send({message: "Token is required"});
    jwt.verify(token, process.env.JWT_SECRET, (user, err) => {
        if(err) return res.status(400).send({message: "Token is not Valid Please Login Again"});
        req.user = user;
        next();
    })
}


module.exports = authenticateJWT;