const jwt = require('jsonwebtoken'),
    USER = require('../models/User'),
    config = require('../config');

exports.verifyUser = async (req, res, next) => {
    const token = req.header("x-auth-token");
    if (!token) {
        return res.status(401).json({ message: "no token, authorization denied" });
    }
    try {
        const decoded = await jwt.verify(token, config.jwtSecret);
        const user = await USER.findOne({ _id: decoded.user.id });
        if (!user) throw "User not found";
        req.user = decoded.user;
        next();
    } catch (err) {
        console.log(err)
        return res.status(401).json({ message: "Token is not valid" });
    }
}