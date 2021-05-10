const jwt = require('jsonwebtoken'),
    USER = require('../models/User'),
    config = require('../config'),
    KEY = require('../models/Key');

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
        console.log(err);
        return res.status(401).json({ message: "Token is not valid" });
    }
}

exports.verifyApiKey = async (req, res, next) => {
    const apiKey = req.header("x-api-key");
    if (!apiKey) {
        return res.status(401).json({ message: "no API key, authorization denied" });
    }
    try {
        const key = await KEY.findOne({ value: apiKey });
        if (!key) throw "API key not valid";
        req.user = { id: key.user };
        next();
    } catch (err) {
        console.log(err);
        return res.status(401).json({ message: "API key is not valid" });
    }
}