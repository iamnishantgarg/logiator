const _ = require('lodash'),
    USER = require('../models/User'),
    bcrypt = require('bcryptjs'),
    jwt = require('jsonwebtoken'),
    config = require('../config');

// register user
exports.signUp = async (req, res, next) => {
    const { name, email, password, phone } = req.body;
    if (_.isNil(name) || _.isNil(email) || _.isNil(password) || _.isNil(phone)) {
        return res.status(400).json({ message: "mandatory field missing" })
    }
    try {
        let user = await USER.findOne({ email: email });
        if (user) {
            return res.status(400).json({ message: "user already exists" })
        }
        user = new USER({ name, email, password, phone, appIds: [], keys: [] });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();
        const tokenPayload = {
            user: {
                id: user.id
            }
        }
        jwt.sign(tokenPayload, config.jwtSecret, { expiresIn: 360000 }, (err, token) => {
            if (err) throw err;
            return res.status(200).json({ message: "successfully created user", token: token })
        })
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "server error" })
    }
}

// login user
exports.signIn = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        if (_.isNil(email) || _.isNil(password)) {
            return res.status(400).json({ message: "mandatory field missing" });
        }
        let user = await USER.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "user not registered" })
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "invalid credentials" });
        }
        const tokenPayload = {
            user: {
                id: user.id
            }
        }
        jwt.sign(tokenPayload, config.jwtSecret,
            { expiresIn: 360000 }, (err, token) => {
                if (err) throw err;
                return res.status(200).json({ message: 'login successful', token });
            })

    } catch (err) {
        console.log(err);
        return res.json(500).json({ message: "server error" });
    }
}

// delete user
exports.deleteUser = async (req, res, next) => {
    try {
        await USER.findOneAndRemove({ _id: req.user.id });
        return res.status(200).json({ message: "successfully deleted user" })
    } catch (err) {
        return res.status(500).json({ message: 'server error' })
    }
}